import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Post,
	Put,
	Query
} from '@nestjs/common'
import { VideoService } from './video.service'
import { Auth } from '../auth/decorators/auth.decorator'
import { CurrentUser } from '../user/user.decorator'
import { VideoDto } from './video.dto'

@Controller('video')
export class VideoController {
	constructor(private readonly videoService: VideoService) {}

	@Get('get-private/:id')
	@Auth()
	async getVideoPrivate(@Param('id') id: string) {
		return this.videoService.getById(+id)
	}

	@Get('by-id/:id')
	@Auth()
	async getVideo(@Param('id') id: string) {
		return this.videoService.getById(+id, true)
	}

	@Get()
	async getAll(@Query('searchTerm') searchTerm: string) {
		return this.videoService.getAll(searchTerm)
	}

	@Get('most-popular')
	async getMostPopularByViews() {
		return this.videoService.getMostPopularByViews()
	}

	@HttpCode(200)
	@Post()
	@Auth()
	async createVideo(@CurrentUser('id') id: number) {
		return this.videoService.create(id)
	}

	@HttpCode(200)
	@Put(':id')
	@Auth()
	async updateVideo(@Param('id') id: string, @Body() dto: VideoDto) {
		return this.videoService.update(+id, dto)
	}

	@HttpCode(200)
	@Delete(':id')
	@Auth()
	async deleteVideo(@Param('id') id: string) {
		return this.videoService.delete(+id)
	}

	@HttpCode(200)
	@Put('update-views/:id')
	@Auth()
	async updateViews(@Param('id') id: string) {
		return this.videoService.updateCountViews(+id)
	}

	@HttpCode(200)
	@Put('update-likes/:id')
	@Auth()
	async updateLikes(@Param('id') id: string) {
		return this.videoService.updateReaction(+id)
	}
}
