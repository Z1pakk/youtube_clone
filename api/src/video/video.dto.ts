import { IsEmail, IsString } from 'class-validator'

export class VideoDto {
	@IsEmail()
	name: string

	isPublic: boolean

	@IsString()
	description: string

	@IsString()
	videoPath: string

	@IsString()
	thumbnailPath: string
}
