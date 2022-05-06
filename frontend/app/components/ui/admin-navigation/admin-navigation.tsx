import React from 'react';

import AdminNavigationItem from './admin-navigation-item';
import { navItems } from './admin-navigation.data';
import s from './admin-navigation.module.scss';

const AdminNavigation = () => {
	return (
		<nav className={s.nav}>
			<ul>
				{navItems.map((item) => (
					<AdminNavigationItem key={item.title} item={item} />
				))}
			</ul>
		</nav>
	);
};

export default AdminNavigation;
