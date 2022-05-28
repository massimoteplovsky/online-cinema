import Link from 'next/link';
import { FC } from 'react';

import { getMoviesUrl } from '@/configs/api.config';

import s from './auth-placeholder.module.scss';

const AuthButton: FC<{ slug: string }> = ({ slug }) => {
	return (
		<Link href={`/auth?redirect=${getMoviesUrl(slug)}`}>
			<a className={s.btn}>Sign in</a>
		</Link>
	);
};

export default AuthButton;
