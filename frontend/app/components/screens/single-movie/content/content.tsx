import { FC } from 'react';

import MaterialIcon from '@/components/ui/material-icon';
import VideoPlayer from '@/components/ui/video-player/video-player';

import { IMovie } from '@/shared/types/movie.types';

import { getActorsUrl, getGenresUrl } from '@/configs/api.config';

import ContentList from './content-list/content-list';
import s from './content.module.scss';

const Content: FC<{ movie: IMovie }> = ({ movie }) => {
	return (
		<div className={s.content}>
			<h1>{movie.title}</h1>
			<div className={s.details}>
				<span>{movie.parameters.year} / </span>
				<span>{movie.parameters.country} / </span>
				<span>{movie.parameters.duration} min. </span>
			</div>
			<ContentList
				name="Genres"
				links={movie.genres.slice(0, 3).map((genre) => ({
					_id: genre._id,
					title: genre.name,
					link: getGenresUrl(genre.slug),
				}))}
			/>
			<ContentList
				name="Actors"
				links={movie.actors.slice(0, 3).map((actor) => ({
					_id: actor._id,
					title: actor.name,
					link: getActorsUrl(actor.slug),
				}))}
			/>
			<div className={s.rating}>
				<MaterialIcon name="MdStarRate" />
				<span>{movie.rating.toFixed(1)}</span>
			</div>
		</div>
	);
};

export default Content;
