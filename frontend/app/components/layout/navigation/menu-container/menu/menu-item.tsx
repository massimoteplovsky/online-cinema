import cn from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';

import MaterialIcon from '@/components/ui/material-icon';

import { IMenuItem } from '../menu.interface';

import s from './menu.module.scss';

const MenuItem: FC<{ item: IMenuItem }> = ({ item }) => {
	const { title, icon, link } = item;
	const { asPath } = useRouter();

	console.log(asPath, link);

	return (
		<li className={cn({ [s.activeItem]: asPath === link })}>
			<Link href={link}>
				<a>
					<MaterialIcon name={icon} />
					<span>{title}</span>
				</a>
			</Link>
		</li>
	);
};

export default MenuItem;
