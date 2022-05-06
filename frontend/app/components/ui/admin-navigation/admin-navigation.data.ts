import { getAdminPath } from '@/configs/url.config';

import { INavItem } from './admin-navigation.interface';

export const navItems: INavItem[] = [
	{
		title: 'Statistics',
		link: getAdminPath(''),
	},
	{
		title: 'Users',
		link: getAdminPath('/users'),
	},
	{
		title: 'Movies',
		link: getAdminPath('/movies'),
	},
	{
		title: 'Actors',
		link: getAdminPath('/actors'),
	},
	{
		title: 'Genres',
		link: getAdminPath('/genres'),
	},
];
