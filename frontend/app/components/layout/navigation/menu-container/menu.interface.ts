import { TMaterialIcons } from '@/shared/types/icon.types';

export interface IMenuItem {
	icon: TMaterialIcons;
	title: string;
	link: string;
}

export interface IMenu {
	title: string;
	items: IMenuItem[];
}
