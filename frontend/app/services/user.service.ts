import axios from 'api/interceptors';

import { IUser } from '@/shared/types/user.types';

import { getUsersUrl } from '@/configs/api.config';

export const UserService = {
	async getUsers(searchTerm?: string) {
		return await axios.get<IUser[]>(getUsersUrl(''), {
			params: searchTerm ? { searchTerm } : {},
		});
	},
	async deleteUser(userId: string) {
		return await axios.delete<string>(getUsersUrl(`${userId}`));
	},
};
