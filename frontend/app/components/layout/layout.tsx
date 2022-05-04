import { FC, ReactNode } from 'react';

import s from './layout.module.scss';
import Navigation from './navigation/navigation';
import Sidebar from './sidebar/sidebar';

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
	return (
		<div className={s.layout}>
			<Navigation />
			<div className={s.center}>{children}</div>
			<Sidebar />
		</div>
	);
};

export default Layout;
