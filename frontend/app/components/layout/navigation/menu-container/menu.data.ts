import { IMenu } from './menu.interface';

export const firstMenu: IMenu = {
	title: 'Menu',
	items: [
		{
			icon: 'MdHome',
			link: '/',
			title: 'Home',
		},
		{
			icon: 'MdExplore',
			link: '/discovery',
			title: 'Discovery',
		},
		{
			icon: 'MdRefresh',
			link: '/new-movies',
			title: 'Fresh movies',
		},
		{
			icon: 'MdLocalFireDepartment',
			link: '/trending',
			title: 'Trending now',
		},
	],
};

export const userMenu: IMenu = {
	title: 'General',
	items: [],
};
