import { axiosInterceptor } from 'api/interceptors';

import { IMovie } from '@/shared/types/movie.types';

import { getMoviesUrl } from '../config/api.config';

export const MovieService = {
	async getMovies(searchTerm?: string) {
		return await axiosInterceptor.get<IMovie[]>(getMoviesUrl(''), {
			params: searchTerm ? { searchTerm } : {},
		});
	},
};
