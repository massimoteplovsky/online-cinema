import Link from 'next/link';
import { FC } from 'react';

import AuthItems from '../auth/auth-items';
import { IMenu } from '../menu.interface';

import MenuItem from './menu-item';
import s from './menu.module.scss';

const Menu: FC<{ menu: IMenu }> = ({ menu }) => {
	const { items, title } = menu;
	return (
		<div className={s.menu}>
			<div className={s.heading}>{title}</div>
			<ul className={s.menuList}>
				{items.map((item, index) => (
					<MenuItem key={index} item={item} />
				))}
				{title === 'General' && <AuthItems />}
			</ul>
		</div>
	);
};

export default Menu;
