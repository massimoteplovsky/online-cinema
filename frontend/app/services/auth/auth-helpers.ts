import Cookies from 'js-cookie';

import { IToken } from '@/store/user/user.interface';

export const setTokens = ({ refreshToken, accessToken }: IToken) => {
	Cookies.set('accessToken', accessToken);
	Cookies.set('refreshToken', refreshToken);
};

export const removeTokens = () => {
	Cookies.remove('accessToken');
	Cookies.remove('refreshToken');
};
