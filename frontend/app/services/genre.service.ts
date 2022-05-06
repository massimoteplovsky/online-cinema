import axios, { axiosClassic } from 'api/interceptors';

import { IGenre } from '@/shared/types/movie.types';

import { getGenresUrl } from '@/configs/api.config';

export const GenreService = {
	async getGenres(searchTerm?: string) {
		return await axiosClassic.get<IGenre[]>(getGenresUrl(''), {
			params: searchTerm ? { searchTerm } : {},
		});
	},
	async deleteGenre(genreId: string) {
		return await axios.delete<string>(getGenresUrl(genreId));
	},
};
