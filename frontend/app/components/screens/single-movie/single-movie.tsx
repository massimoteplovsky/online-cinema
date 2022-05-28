import { FC } from 'react';

import Banner from '@/components/ui/banner/banner';
import Gallery from '@/components/ui/gallery/gallery';
import SubHeading from '@/components/ui/heading/sub-heading';
import AuthPlaceholder from '@/components/ui/video-player/auth-placeholder/auth-placeholder';
import VideoPlayer from '@/components/ui/video-player/video-player';

import { IMovie } from '@/shared/types/movie.types';

import Meta from '@/utils/meta/meta';

import { useAppSelector } from '@/store/store';

import { IMoviePage } from '../../../../pages/movies/[slug]';

import Content from './content/content';

const SingleMovie: FC<IMoviePage> = ({ movie, similarMovies }) => {
	const { user } = useAppSelector(({ user }) => user);
	return (
		<Meta title={movie.title} description={movie.description}>
			<Banner
				image={movie.bigPoster}
				Detail={() => <Content movie={movie} />}
			/>
			{user ? (
				<VideoPlayer videoUrl={movie.videoUrl} />
			) : (
				<AuthPlaceholder slug={movie.slug} />
			)}
			<div className="mt-12">
				<SubHeading title="Similar Movies" />
				<Gallery items={similarMovies} />
			</div>
		</Meta>
	);
};

export default SingleMovie;
