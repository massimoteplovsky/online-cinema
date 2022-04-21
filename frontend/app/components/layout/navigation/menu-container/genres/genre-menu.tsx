import { FC } from 'react';

import SkeletonLoader from '@/components/ui/skeleton-loader';

import Menu from '../menu/menu';

import { useGenres } from './useGenres';

const GenreMenu: FC = () => {
	const { isLoading, data } = useGenres();

	if (isLoading)
		return (
			<div className="mx-11 mb-6">
				<SkeletonLoader count={5} className="h-7 mt-6" />
			</div>
		);

	return <Menu menu={{ title: 'Genres', items: data || [] }} />;
};

export default GenreMenu;
