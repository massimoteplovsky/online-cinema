import { GetStaticProps, NextPage } from 'next';
import React from 'react';

import Catalog from '@/components/ui/catalog-movies/catalog';

import { IMovie } from '@/shared/types/movie.types';

import { MovieService } from '@/services/movie.service';

const TrendingMoviesPage: NextPage<{ movies: IMovie[] }> = ({ movies }) => {
	return (
		<Catalog
			title="Trending movies"
			description="Trending movies and series... Watch now!"
			movies={movies || []}
		/>
	);
};

export const getStaticProps: GetStaticProps = async () => {
	try {
		const { data: movies } = await MovieService.getPopularMovies();
		return {
			props: {
				movies,
			},
		};
	} catch (error) {
		return {
			notFound: true,
		};
	}
};

export default TrendingMoviesPage;
