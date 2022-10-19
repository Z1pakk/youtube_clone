import { Column, Entity, OneToMany } from 'typeorm'
import { VideoEntity } from '../video/video.entity'
import { Base } from '../utils/base'
import { SubscriptionEntity } from './subscription.entity'
import { CommentEntity } from '../comment/comment.entity'
import { Exclude } from 'class-transformer'

@Entity('User')
export class UserEntity extends Base {
	@Column({ unique: true })
	email: string

	@Exclude()
	@Column({ select: false })
	password: string

	@Column({ default: '' })
	name: string

	@Column({ default: false, name: 'is_verified' })
	isVerified: boolean

	@Column({ default: 0, name: 'subscribers_count' })
	subscribersCount?: number

	@Column({ default: '', type: 'text' })
	description: string

	@Column({ default: '', name: 'avatar_path' })
	avatarPath: string

	@OneToMany(() => VideoEntity, video => video.user)
	videos: VideoEntity[]

	@OneToMany(() => SubscriptionEntity, subscription => subscription.fromUser)
	subscriptions: SubscriptionEntity[]

	@OneToMany(() => SubscriptionEntity, subscription => subscription.toUser)
	subscribers: SubscriptionEntity[]

	@OneToMany(() => CommentEntity, comment => comment.user)
	comments: CommentEntity[]
}
