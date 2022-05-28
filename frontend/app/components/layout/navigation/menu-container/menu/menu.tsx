import dynamic from 'next/dynamic';
import { FC } from 'react';

import { IMenu } from '../menu.interface';

import MenuItem from './menu-item';
import s from './menu.module.scss';

const DynamicAuthItems = dynamic(() => import('../auth/auth-items'), {
	ssr: false,
});

const Menu: FC<{ menu: IMenu }> = ({ menu }) => {
	const { items, title } = menu;
	return (
		<div className={s.menu}>
			<div className={s.heading}>{title}</div>
			<ul className={s.menuList}>
				{items.map((item, index) => (
					<MenuItem key={index} item={item} />
				))}
				{title === 'General' && <DynamicAuthItems />}
			</ul>
		</div>
	);
};

export default Menu;
