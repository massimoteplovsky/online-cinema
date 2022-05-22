import { IMovie } from '@/shared/types/movie.types';

export interface IMovieEdit
	extends Omit<IMovie, '_id' | 'rating' | 'countOpened' | 'genres' | 'actors'> {
	genres: string[];
	actors: string[];
}
