export interface IGalleryItem {
	posterPath: string;
	name: string;
	link: string;
	content?: {
		title?: string;
		subTitle?: string;
	};
}

export interface IGallery {
	item: IGalleryItem;
	variant: 'vertical' | 'horizontal';
}
