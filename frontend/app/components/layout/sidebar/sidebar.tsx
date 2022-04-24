import React from 'react';

import MoviesContainer from './movies-container/movies-container';
import Search from './search/search/search';
import s from './sidebar.module.scss';

const Sidebar = () => {
	return (
		<div className={s.sidebar}>
			<Search />
			<MoviesContainer />
		</div>
	);
};

export default Sidebar;
