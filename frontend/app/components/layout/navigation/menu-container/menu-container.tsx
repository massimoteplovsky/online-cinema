import { FC } from 'react';

import GenreMenu from './genres/genre-menu';
import { firstMenu, userMenu } from './menu.data';
import Menu from './menu/menu';

const MenuContainer: FC = () => {
	return (
		<div>
			<Menu menu={firstMenu} />
			<GenreMenu />
			<Menu menu={userMenu} />
		</div>
	);
};

export default MenuContainer;
