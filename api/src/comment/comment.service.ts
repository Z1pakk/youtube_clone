import { Injectable } from '@nestjs/common'
import { CommentDto } from './comment.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { CommentEntity } from './comment.entity'
import { Repository } from 'typeorm'

@Injectable()
export class CommentService {
	constructor(
		@InjectRepository(CommentEntity)
		private readonly commentRepository: Repository<CommentEntity>
	) {}

	// create
	async create(userId: number, dto: CommentDto) {
		const newComment = this.commentRepository.create({
			message: dto.message,
			video: { id: dto.videoId },
			user: { id: userId }
		})

		return this.commentRepository.save(newComment)
	}
}
