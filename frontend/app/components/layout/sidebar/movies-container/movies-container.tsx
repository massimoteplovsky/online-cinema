import React from 'react';
import Skeleton from 'react-loading-skeleton';
import { useQuery } from 'react-query';

import { MovieService } from '@/services/movie.service';

import FavoriteMovies from './favorite-movies.tsx/favorite-movies';
import s from './movies-container.module.scss';
import PopularMovies from './popular-movies/popular-movies';

const MoviesContainer = () => {
	return (
		<div>
			<PopularMovies />
			<FavoriteMovies />
		</div>
	);
};

export default MoviesContainer;
