import { axiosInterceptor } from 'api/interceptors';

import { IGenre } from '@/shared/types/movie.types';

import { getGenresUrl } from '../config/api.config';

export const GenreService = {
	async getGenres(searchTerm?: string) {
		return await axiosInterceptor.get<IGenre[]>(getGenresUrl(''), {
			params: searchTerm ? { searchTerm } : {},
		});
	},
};
