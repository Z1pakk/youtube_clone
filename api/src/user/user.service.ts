import {
	BadRequestException,
	Injectable,
	NotFoundException
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UserEntity } from './user.entity'
import { Repository } from 'typeorm'
import { SubscriptionEntity } from './subscription.entity'
import { UserDto } from './user.dto'
import { genSalt, hash } from 'bcryptjs'

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(UserEntity)
		private readonly userRepository: Repository<UserEntity>,
		@InjectRepository(SubscriptionEntity)
		private readonly subscriptionRepository: Repository<SubscriptionEntity>
	) {}

	// by-id

	async getById(id: number) {
		const user = await this.userRepository.findOne({
			where: { id },
			relations: {
				videos: true,
				subscriptions: {
					toUser: true
				}
			},
			order: {
				createdAt: 'DESC'
			}
		})

		if (!user) throw new NotFoundException('User not found')

		return user
	}

	// by-email
	async getByEmail(email: string) {
		const user = await this.userRepository.findOne({
			where: {
				email
			},
			select: ['id', 'email', 'password']
		})

		return user
	}

	// update

	async updateProfile(id: number, dto: UserDto) {
		const user = await this.getById(id)

		const isSameUser = await this.getByEmail(dto.email)
		if (isSameUser && id !== isSameUser.id)
			throw new BadRequestException('User with this email exists')

		if (dto.password) {
			const salt = await genSalt(10)
			user.password = await hash(dto.password, salt)
		}

		user.email = dto.email
		user.name = dto.name
		user.description = dto.description
		user.avatarPath = dto.avatarPath

		return this.userRepository.save(user)
	}

	// subscribe

	async subscribe(id: number, channelId: number) {
		const data = {
			toUser: { id: channelId },
			fromUser: { id }
		}

		const isSubscribed = await this.subscriptionRepository.findOneBy(data)

		if (!isSubscribed) {
			const newSubscription = await this.subscriptionRepository.create(data)
			await this.subscriptionRepository.save(newSubscription)

			return true
		}

		await this.subscriptionRepository.delete(data)
		return false
	}

	// getAll

	async getAll() {
		return this.userRepository.find()
	}
}
