import React, { FC } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useQuery } from 'react-query';

import { MovieService } from '@/services/movie.service';

import MovieList from '../movie-list/movie-list';

const PopularMovies: FC = () => {
	const { isLoading, data: popularMovies = [] } = useQuery(
		'Get popular movies',
		() => MovieService.getPopularMovies(),
		{
			select: ({ data }) => data,
		}
	);

	if (isLoading) {
		return (
			<div className="mt-11">
				<Skeleton count={3} className="h-20 mb-4" />
			</div>
		);
	}

	if (!popularMovies.length) return null;

	return (
		<MovieList title="Popular movies" link="/trending" movies={popularMovies} />
	);
};

export default PopularMovies;
