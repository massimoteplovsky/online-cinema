import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import React from 'react';

import Catalog from '@/components/ui/catalog-movies/catalog';

import { IGenre, IMovie } from '@/shared/types/movie.types';

import { GenreService } from '@/services/genre.service';
import { MovieService } from '@/services/movie.service';

import Error404 from '../404';

interface IGenrePage {
	movies: IMovie[];
	genre: IGenre;
}

const GenrePage: NextPage<IGenrePage> = ({ movies, genre }) => {
	return genre ? (
		<Catalog
			title={genre.name}
			description={genre.description}
			movies={movies || []}
		/>
	) : (
		<Error404 />
	);
};

export const getStaticPaths: GetStaticPaths = async () => {
	try {
		const { data: genres } = await GenreService.getGenres();
		const paths = genres.map((genre) => {
			return {
				params: { slug: genre.slug },
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
		const { data: genre } = await GenreService.getGenreBySlug(
			String(params?.slug)
		);
		const { data: movies } = await MovieService.getMoviesByGenres([genre._id]);

		return {
			props: {
				genre,
				movies,
			},
		};
	} catch (error) {
		return {
			notFound: true,
		};
	}
};

export default GenrePage;
