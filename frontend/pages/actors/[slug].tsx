import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import React from 'react';

import Catalog from '@/components/ui/catalog-movies/catalog';

import { IActor, IGenre, IMovie } from '@/shared/types/movie.types';

import { ActorService } from '@/services/actor.service';
import { MovieService } from '@/services/movie.service';

import Error404 from '../404';

interface IActorPage {
	movies: IMovie[];
	actor: IActor;
}

const GenrePage: NextPage<IActorPage> = ({ movies, actor }) => {
	return actor ? (
		<Catalog title={actor.name} movies={movies || []} />
	) : (
		<Error404 />
	);
};

export const getStaticPaths: GetStaticPaths = async () => {
	try {
		const { data: actors } = await ActorService.getActors();
		const paths = actors.map((actor) => {
			return {
				params: { slug: actor.slug },
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
		const { data: actor } = await ActorService.getActorBySlug(
			String(params?.slug)
		);
		const { data: movies } = await MovieService.getMoviesByActor(actor._id);
		console.log(movies);
		return {
			props: {
				actor,
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
