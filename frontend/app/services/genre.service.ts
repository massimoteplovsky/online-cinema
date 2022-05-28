import axios, { axiosClassic } from 'api/interceptors';

import { IGenreEdit } from '@/components/screens/admin/edit/genres/genres-edit.interface';

import { IGenre } from '@/shared/types/movie.types';

import { getGenresUrl } from '@/configs/api.config';

export const GenreService = {
	async getGenres(searchTerm?: string) {
		return await axiosClassic.get<IGenre[]>(getGenresUrl(''), {
			params: searchTerm ? { searchTerm } : {},
		});
	},
	async getGenreById(genreId: string) {
		return await axios.get<IGenreEdit>(getGenresUrl(genreId));
	},
	async getGenreBySlug(slug: string) {
		return await axiosClassic.get<IGenre>(getGenresUrl(`by-slug/${slug}`));
	},
	async deleteGenre(genreId: string) {
		return await axios.delete<string>(getGenresUrl(genreId));
	},
	async createGenre(genreData: IGenreEdit) {
		return await axios.post<string>(getGenresUrl(''), genreData);
	},
	async updateGenre(genreId: string, genreData: IGenreEdit) {
		return await axios.put<IGenre>(getGenresUrl(genreId), genreData);
	},
};
