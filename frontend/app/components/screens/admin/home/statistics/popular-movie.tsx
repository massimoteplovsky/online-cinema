import cn from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useQuery } from 'react-query';

import SubHeading from '@/components/ui/heading/sub-heading';
import SkeletonLoader from '@/components/ui/skeleton-loader';

import { MovieService } from '@/services/movie.service';

import { getMoviesPath } from '@/configs/url.config';

import s from '../admin.module.scss';

const PopularMovie = () => {
	const { isLoading, data: popularMovie } = useQuery(
		'Get popular movie in admin panel',
		async () => {
			return MovieService.getPopularMovies();
		},
		{
			select: ({ data }) => data[0],
		}
	);

	return (
		<div className={cn(s.block, s.popular)}>
			<SubHeading title="The most popular movie" />
			{isLoading ? (
				<SkeletonLoader className="h-48" />
			) : (
				popularMovie && (
					<>
						<h3>
							Opened {popularMovie.countOpened}{' '}
							{popularMovie.countOpened > 1 ? 'times' : 'time'}
						</h3>
						<Link href={getMoviesPath(`/${popularMovie.slug}`)}>
							<a>
								<Image
									width={285}
									height={176}
									src={popularMovie.bigPoster}
									alt={popularMovie.title}
									className={s.image}
									unoptimized
								/>
							</a>
						</Link>
					</>
				)
			)}
		</div>
	);
};

export default PopularMovie;
