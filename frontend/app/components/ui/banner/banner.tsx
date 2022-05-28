import Image from 'next/image';
import { FC } from 'react';

import s from './banner.module.scss';

interface IBanner {
	image: string;
	Detail?: FC | null;
}

const Banner: FC<IBanner> = ({ image, Detail }) => {
	return (
		<div className={s.banner}>
			<Image
				src={image}
				draggable={false}
				layout="fill"
				alt="Movie image"
				className="image-like-bg object-top"
				unoptimized
				priority
			/>
			{Detail && <Detail />}
		</div>
	);
};

export default Banner;
