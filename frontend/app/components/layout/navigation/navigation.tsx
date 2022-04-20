import React from 'react';

import Logo from '../navigation/logo';

import MenuContainer from './menu-container/menu-container';
import s from './navigation.module.scss';

const Navigation = () => {
	return (
		<div className={s.navigation}>
			<Logo />
			<MenuContainer />
		</div>
	);
};

export default Navigation;
