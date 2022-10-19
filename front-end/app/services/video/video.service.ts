import { IUser } from '@/types/user.interface'
import { IVideo } from '@/types/video.interface'
import { axiosClassic } from '../../api/axios'

export const VIDEO = 'video'

export const UserService = {
	async getAll() {
		const response = await axiosClassic.get<IVideo[]>(`/${VIDEO}`)

		return response.data
	},
	async getMostPopular() {
		const response = await axiosClassic.get<IUser[]>(`/${VIDEO}/most-popular`)

		return response.data
	}
}
