import { FC } from 'react';

import Meta from '@/utils/meta/meta';

import { getMoviesUrl } from '@/configs/api.config';

import GalleryItem from '../gallery/gallery-item';
import Description from '../heading/description';
import Heading from '../heading/heading';

import { ICatalog } from './catalog.interface';
import s from './catalog.module.scss';

const Catalog: FC<ICatalog> = ({ title, description, movies }) => {
	return (
		<Meta title={title} description={description}>
			<Heading className={s.heading} title={title} />
			{description && <Description text={description} />}
			{movies.length ? (
				<section className={s.movies}>
					{movies.map((movie) => (
						<GalleryItem
							key={movie._id}
							item={{
								name: movie.title,
								link: getMoviesUrl(movie.slug),
								posterPath: movie.bigPoster,
								content: {
									title: movie.title,
								},
							}}
							variant="horizontal"
						/>
					))}
				</section>
			) : (
				<h2 className="my-10 text-white text-2xl">Movies not found</h2>
			)}
		</Meta>
	);
};

export default Catalog;
