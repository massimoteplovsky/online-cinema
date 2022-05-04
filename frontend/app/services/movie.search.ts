import { axiosInterceptor } from 'api/interceptors';

import { IMovie } from '@/shared/types/movie.types';

import { getMoviesUrl } from '@/configs/api.config';

export const MovieService = {
	async getMovies(searchTerm?: string) {
		return await axiosInterceptor.get<IMovie[]>(getMoviesUrl(''), {
			params: searchTerm ? { searchTerm } : {},
		});
	},
	async getPopularMovies() {
		return await axiosInterceptor.get<IMovie[]>(getMoviesUrl('most-popular'));
	},
};
