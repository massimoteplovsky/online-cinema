import Image from 'next/image';
import Link from 'next/link';
import React, { FC } from 'react';

import MaterialIcon from '@/components/ui/material-icon';

import { IMovie } from '@/shared/types/movie.types';

import { getGenresPath, getMoviesPath } from '@/configs/url.config';

import s from './movie-item.module.scss';

const MovieItem: FC<{ movie: IMovie }> = ({ movie }) => {
	return (
		<div className={s.item}>
			<Link href={getMoviesPath(movie.slug)}>
				<a>
					<Image
						src={movie.poster}
						width={65}
						height={97}
						draggable={false}
						priority
						alt={movie.title}
					/>
				</a>
			</Link>
			<div className={s.info}>
				<h3 className={s.title}>{movie.title}</h3>
				<div className={s.genres}>
					{movie.genres.map((genre, index, arr) => (
						<Link key={genre._id} href={getGenresPath(genre.slug)}>
							<a>
								{genre.name} {index !== arr.length - 1 ? ', ' : ''}
							</a>
						</Link>
					))}
				</div>
				<div className={s.rating}>
					<MaterialIcon name="MdStarRate" />
					<span>{movie.rating.toFixed(1)}</span>
				</div>
			</div>
		</div>
	);
};

export default MovieItem;
