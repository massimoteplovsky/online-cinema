import { createAsyncThunk } from '@reduxjs/toolkit';
import { errorCatch } from 'api/api.helpers';
import { toastr } from 'react-redux-toastr';

import { AuthService } from '@/services/auth/auth.service';

import { toastrError } from '@/utils/toastr-error';

import { IAuthResponse, IEmailPassword } from './user.interface';

export const register = createAsyncThunk<IAuthResponse, IEmailPassword>(
	'auth/register',
	async (userData, { rejectWithValue }) => {
		try {
			const response = await AuthService.registerUser(userData);
			toastr.success('Registration', 'Completed successfully');
			return response;
		} catch (err) {
			toastrError(err);
			return rejectWithValue(err);
		}
	}
);

export const login = createAsyncThunk<IAuthResponse, IEmailPassword>(
	'auth/login',
	async (userData, { rejectWithValue }) => {
		try {
			const response = await AuthService.loginUser(userData);
			toastr.success('Login', 'Completed successfully');
			return response;
		} catch (err) {
			toastrError(err);
			return rejectWithValue(err);
		}
	}
);

export const logout = createAsyncThunk(
	'auth/logout',
	async (_, { rejectWithValue }) => {
		await AuthService.logoutUser();
	}
);

export const checkAuth = createAsyncThunk<IAuthResponse>(
	'auth/checkAuth',
	async (_, { dispatch, rejectWithValue }) => {
		try {
			const response = await AuthService.getNewTokens();
			return response;
		} catch (err) {
			if (errorCatch(err) === 'jwt expired') {
				toastr.error(
					'Logout',
					'Your authorization is finished, please login again'
				);
				dispatch(logout());
			}

			return rejectWithValue(err);
		}
	}
);
