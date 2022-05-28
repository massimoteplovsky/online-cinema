import type { GetStaticProps, NextPage } from 'next';

import Home from '@/components/screens/home/home';
import { IHome } from '@/components/screens/home/home.interface';
import { IGalleryItem } from '@/components/ui/gallery/gallery.interface';
import { ISlide } from '@/components/ui/slider/slider.interface';

import { IGenre } from '@/shared/types/movie.types';

import { ActorService } from '@/services/actor.service';
import { MovieService } from '@/services/movie.service';

import { getActorsUrl, getMoviesUrl } from '@/configs/api.config';

const HomePage: NextPage<IHome> = ({ slides, movies, actors }) => {
	return <Home slides={slides} movies={movies} actors={actors} />;
};

export const getStaticProps: GetStaticProps = async () => {
	try {
		const { data: sliderMovies } = await MovieService.getMovies();

		const slides: ISlide[] = sliderMovies.slice(0, 5).map((movie) => ({
			_id: movie._id,
			link: getMoviesUrl(movie.slug),
			bigPoster: movie.bigPoster,
			subTitle: movie.genres.map((i: IGenre) => i.name).join(', '),
			title: movie.title,
		}));

		const { data: actorsData } = await ActorService.getActors();
		const actors: IGalleryItem[] = actorsData.slice(0, 8).map((actor) => ({
			name: actor.name,
			posterPath: actor.photo,
			link: getActorsUrl(actor.slug),
			content: {
				title: actor.name,
				subTitle: `+${actor.countMovies} movies`,
			},
		}));

		const { data: popularMovies } = await MovieService.getPopularMovies();
		const movies: IGalleryItem[] = popularMovies.slice(0, 8).map((movie) => ({
			name: movie.title,
			posterPath: movie.poster,
			link: getActorsUrl(movie.slug),
		}));

		return {
			props: {
				slides,
				actors,
				movies,
			},
		};
	} catch (error) {
		return {
			props: {
				slides: [],
				actors: [],
				movies: [],
			},
		};
	}
};

export default HomePage;
