import { axiosClassic } from 'api/interceptors';
import Cookies from 'js-cookie';

import {
	removeFromLocalStorage,
	saveToLocalStorage,
} from '@/utils/local-storage';

import { getAuthUrl } from '@/configs/api.config';

import { IAuthResponse } from '@/store/user/user.interface';

import { removeTokens, setTokens } from './auth-helpers';

export const AuthService = {
	async registerUser(userData: { email: string; password: string }) {
		const { data } = await axiosClassic.post<IAuthResponse>(
			getAuthUrl('register'),
			userData
		);

		if (data.accessToken) {
			saveToLocalStorage('user', data.user);
			setTokens({
				accessToken: data.accessToken,
				refreshToken: data.refreshToken,
			});
		}

		return data;
	},
	async loginUser(userData: { email: string; password: string }) {
		const { data } = await axiosClassic.post<IAuthResponse>(
			getAuthUrl('login'),
			userData
		);

		if (data.accessToken) {
			saveToLocalStorage('user', data.user);
			setTokens({
				accessToken: data.accessToken,
				refreshToken: data.refreshToken,
			});
		}

		return data;
	},
	async getNewTokens() {
		const refreshToken = Cookies.get('refreshToken');
		const { data } = await axiosClassic.post<IAuthResponse>(
			getAuthUrl('login/access-token'),
			{ refreshToken }
		);

		if (data.accessToken) {
			saveToLocalStorage('user', data.user);
			setTokens({
				accessToken: data.accessToken,
				refreshToken: data.refreshToken,
			});
		}

		return data;
	},
	async logoutUser() {
		removeTokens();
		removeFromLocalStorage('user');
	},
};
