import type { GetStaticProps, NextPage } from 'next';

import Home from '@/components/screens/home/home';
import { IHome } from '@/components/screens/home/home.interface';
import { ISlide } from '@/components/ui/slider/slider.interface';

import { IGenre } from '@/shared/types/movie.types';

import { MovieService } from '@/services/movie.service';

import { getMoviesUrl } from '@/configs/api.config';

const HomePage: NextPage<IHome> = ({ slides }) => {
	return <Home slides={slides} />;
};

export const getStaticProps: GetStaticProps = async () => {
	try {
		const { data: movies } = await MovieService.getMovies();

		const slides: ISlide[] = movies.slice(0, 5).map((movie) => ({
			_id: movie._id,
			link: getMoviesUrl(movie.slug),
			bigPoster: movie.bigPoster,
			subTitle: movie.genres.map((i: IGenre) => i.name).join(', '),
			title: movie.title,
		}));

		return {
			props: {
				slides,
			},
		};
	} catch (error) {
		return {
			props: {
				slides: [],
			},
		};
	}
};

export default HomePage;
