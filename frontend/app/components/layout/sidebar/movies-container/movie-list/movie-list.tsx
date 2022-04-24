import Link from 'next/link';
import React, { FC } from 'react';

import MovieItem from '../movie-item/movie-item';
import { IMovieList } from '../movie-list/movie-list.interface';

import s from './movie-list.module.scss';

const MovieList: FC<IMovieList> = ({ title, link, movies }) => {
	return (
		<div className={s.list}>
			<h2 className={s.heading}>{title}</h2>
			{movies.map((movie) => (
				<MovieItem key={movie._id} movie={movie} />
			))}
			<Link href={link}>
				<a className={s.button}>See more</a>
			</Link>
		</div>
	);
};

export default MovieList;
