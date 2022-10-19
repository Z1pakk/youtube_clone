import {
	Body,
	Controller,
	Get,
	HttpCode,
	Param,
	Patch,
	Put,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { UserService } from './user.service'
import { Auth } from '../auth/decorators/auth.decorator'
import { CurrentUser } from './user.decorator'
import { UserDto } from './user.dto'

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get('profile')
	@Auth()
	async getProfile(@CurrentUser('id') id: number) {
		return this.userService.getById(id)
	}

	@Get('by-id/:id')
	async getUser(@Param('id') id: string) {
		return this.userService.getById(+id)
	}

	// Only for testing
	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Put(':id')
	@Auth()
	async updateUser(@Param('id') id: string, @Body() dto: UserDto) {
		return this.userService.updateProfile(+id, dto)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Patch('subscribe/:channelId')
	@Auth()
	async subscribe(
		@Param('channelId') channelId: string,
		@CurrentUser('id') id: number
	) {
		return this.userService.subscribe(id, +channelId)
	}

	@Get()
	async getAll() {
		return this.userService.getAll()
	}
}
