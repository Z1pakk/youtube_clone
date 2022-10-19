import { IUser } from '@/types/user.interface'
import { axiosClassic } from '../../api/axios'

export const USER = 'user'

export const UserService = {
	async getAll() {
		const response = await axiosClassic.get<IUser[]>(`/${USER}`)

		return response.data
	},
	async getUser(id: number) {
		const response = await axiosClassic.get<IUser[]>(`/${USER}/by-id/${id}`)

		return response.data
	}
}
