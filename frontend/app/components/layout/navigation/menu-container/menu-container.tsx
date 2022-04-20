import { FC } from 'react';

import { firstMenu, userMenu } from './menu.data';
import Menu from './menu/menu';

const MenuContainer: FC = () => {
	return (
		<div>
			<Menu menu={firstMenu} />
			<Menu menu={userMenu} />
		</div>
	);
};

export default MenuContainer;
