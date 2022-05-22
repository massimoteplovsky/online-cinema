import axios, { axiosClassic } from 'api/interceptors';

import { IMovieEdit } from '@/components/screens/admin/edit/movies/movie-edit.interface';

import { IMovie } from '@/shared/types/movie.types';

import { getMoviesUrl } from '@/configs/api.config';

export const MovieService = {
	async getMovies(searchTerm?: string) {
		return await axiosClassic.get<IMovie[]>(getMoviesUrl(''), {
			params: searchTerm ? { searchTerm } : {},
		});
	},
	async getMovieById(movieId: string) {
		return await axios.get<IMovie>(getMoviesUrl(movieId));
	},
	async getPopularMovies() {
		return await axiosClassic.get<IMovie[]>(getMoviesUrl('most-popular'));
	},
	async createMovie(movieData: IMovieEdit) {
		return await axios.post<string>(getMoviesUrl(''), movieData);
	},
	async updateMovie(movieId: string, movieData: IMovieEdit) {
		console.log(movieData);
		return await axios.put<IMovie>(getMoviesUrl(movieId), movieData);
	},
	async deleteMovie(movieId: string) {
		return await axios.delete<string>(getMoviesUrl(movieId));
	},
};
