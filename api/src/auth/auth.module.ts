import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { JwtStrategy } from './strategies/jwt.strategy'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { getJwtConfig } from '../config/jwt.config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserEntity } from '../user/user.entity'
import { UserModule } from '../user/user.module'

@Module({
	imports: [
		ConfigModule,
		UserModule,
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getJwtConfig
		}),
		TypeOrmModule.forFeature([UserEntity])
	],
	controllers: [AuthController],
	providers: [AuthService, JwtStrategy]
})
export class AuthModule {}
