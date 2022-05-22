import { IGenre } from '@/shared/types/movie.types';

export interface IGenreEdit extends Omit<IGenre, '_id'> {}
