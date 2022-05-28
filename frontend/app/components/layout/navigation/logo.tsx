import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

import logoImage from '@/assets/images/logo.png';

import s from './navigation.module.scss';

const Logo: FC = () => {
	return (
		<Link href="/">
			<a className={s.logo}>
				<Image
					src={logoImage}
					width={32}
					height={32}
					draggable={false}
					alt="Logo"
				/>
				<span className={s.text}>Online cinema</span>
			</a>
		</Link>
	);
};

export default Logo;
