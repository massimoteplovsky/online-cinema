import cn from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

import { IGallery } from './gallery.interface';
import s from './gallery.module.scss';

const GalleryItem: FC<IGallery> = ({ item, variant }) => {
	return (
		<Link href={item.link}>
			<a
				className={cn(s.item, {
					[s.withText]: item.content,
					[s.horizontal]: variant === 'horizontal',
					[s.vertical]: variant === 'vertical',
				})}
			>
				<Image
					alt={item.name}
					src={item.posterPath}
					layout="fill"
					draggable={false}
					priority
				/>
				{item.content && (
					<div className={s.content}>
						<div className={s.title}>{item.content.title}</div>
						{item.content.subTitle && (
							<div className={s.subTitle}>{item.content.subTitle}</div>
						)}
					</div>
				)}
			</a>
		</Link>
	);
};

export default GalleryItem;
