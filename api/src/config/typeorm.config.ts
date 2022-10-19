import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { ConfigService } from '@nestjs/config'

export const getTypeOrmConfig = async (
	configService: ConfigService
): Promise<TypeOrmModuleOptions> => {
	return {
		type: 'postgres',
		host: 'localhost',
		port: configService.get<number>('POSTGRESQL_PORT'),
		database: configService.get('POSTGRESQL_DATABASE'),
		username: configService.get('POSTGRESQL_USERNAME'),
		password: configService.get('POSTGRESQL_PASSWORD'),
		autoLoadEntities: true,
		synchronize: true
	}
}
