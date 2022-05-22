import { TMaterialIcons } from './icon.types';

export interface IGenre {
	_id: string;
	name: string;
	slug: string;
	description: string;
	icon: TMaterialIcons;
}

export interface IActor {
	_id: string;
	name: string;
	photo: string;
	slug: string;
	createdAt: string;
	countMovies: number;
}

export interface IParameters {
	_id: string;
	year: number;
	duration: number;
	country: string;
}

export interface IMovie {
	_id: string;
	poster: string;
	bigPoster: string;
	title: string;
	parameters: IParameters;
	genres: IGenre[];
	actors: string[];
	countOpened: number;
	description: string;
	slug: string;
	videoUrl: string;
	rating: number;
}
