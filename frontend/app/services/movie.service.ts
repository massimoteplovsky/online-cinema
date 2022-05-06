import axios, { axiosClassic } from 'api/interceptors';

import { IMovie } from '@/shared/types/movie.types';

import { getMoviesUrl } from '@/configs/api.config';

export const MovieService = {
	async getMovies(searchTerm?: string) {
		return await axiosClassic.get<IMovie[]>(getMoviesUrl(''), {
			params: searchTerm ? { searchTerm } : {},
		});
	},
	async getPopularMovies() {
		return await axiosClassic.get<IMovie[]>(getMoviesUrl('most-popular'));
	},
	async deleteMovie(movieId: string) {
		return await axios.delete<string>(getMoviesUrl(movieId));
	},
};
