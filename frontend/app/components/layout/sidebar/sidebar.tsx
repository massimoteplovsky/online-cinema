import React from 'react';

import Search from './search/search/search';
import s from './sidebar.module.scss';

const Sidebar = () => {
	return (
		<div className={s.sidebar}>
			<Search />
		</div>
	);
};

export default Sidebar;
