import { getMoviesPath } from 'config/url.config';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

import { IMovie } from '@/shared/types/movie.types';

import s from './search-list.module.scss';

const SearchList: FC<{ movies: IMovie[] }> = ({ movies }) => {
	return (
		<div className={s.list}>
			{movies.length ? (
				movies.map((movie) => (
					<Link key={movie._id} href={getMoviesPath(movie.slug)}>
						<a>
							<Image
								src={movie.poster}
								width={50}
								height={50}
								alt={movie.title}
								objectFit="cover"
								objectPosition="top"
								draggable={false}
							/>
							<span>{movie.title}</span>
						</a>
					</Link>
				))
			) : (
				<div className="text-white text-center my-4">Movies not found</div>
			)}
		</div>
	);
};

export default SearchList;
