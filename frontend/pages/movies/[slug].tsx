import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import React from 'react';

import SingleMovie from '@/components/screens/single-movie/single-movie';
import Catalog from '@/components/ui/catalog-movies/catalog';
import { IGalleryItem } from '@/components/ui/gallery/gallery.interface';

import { IMovie } from '@/shared/types/movie.types';

import { MovieService } from '@/services/movie.service';

import { getMoviesPath } from '@/configs/url.config';

import Error404 from '../404';

export interface IMoviePage {
	movie: IMovie;
	similarMovies: IGalleryItem[];
}

const MoviePage: NextPage<IMoviePage> = ({ movie, similarMovies }) => {
	return movie ? (
		<SingleMovie movie={movie} similarMovies={similarMovies} />
	) : (
		<Error404 />
	);
};

export const getStaticPaths: GetStaticPaths = async () => {
	try {
		const { data: movies } = await MovieService.getMovies();
		const paths = movies.map((movie) => {
			return {
				params: { slug: movie.slug },
			};
		});

		return {
			paths,
			fallback: 'blocking',
		};
	} catch {
		return {
			paths: [],
			fallback: false,
		};
	}
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
	try {
		const { data: movie } = await MovieService.getMovieBySlug(
			String(params?.slug)
		);
		console.log(movie, 'Movie page');
		const { data: similarMovies } = await MovieService.getMoviesByGenres(
			movie.genres.map((genre) => genre._id)
		);

		return {
			props: {
				movie,
				similarMovies: similarMovies
					.filter((similarMovie) => similarMovie._id !== movie._id)
					.map((movie) => ({
						posterPath: movie.poster,
						link: getMoviesPath(`/${movie.slug}`),
						name: movie.title,
					})),
			},
		};
	} catch (error) {
		return {
			notFound: true,
		};
	}
};

export default MoviePage;
