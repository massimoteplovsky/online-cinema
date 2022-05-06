import axios from 'api/interceptors';

import { getUsersUrl } from '@/configs/api.config';

export const AdminService = {
	async getUsersCount() {
		return await axios.get<number>(getUsersUrl('count'));
	},
};
