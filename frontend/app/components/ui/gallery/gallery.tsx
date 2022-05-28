import { FC } from 'react';

import GalleryItem from './gallery-item';
import { IGalleryItem } from './gallery.interface';
import s from './gallery.module.scss';

const Gallery: FC<{ items: IGalleryItem[] }> = ({ items }) => {
	return (
		<div className={s.gallery}>
			{items.map((item) => (
				<GalleryItem key={item.link} item={item} variant="vertical" />
			))}
		</div>
	);
};

export default Gallery;
