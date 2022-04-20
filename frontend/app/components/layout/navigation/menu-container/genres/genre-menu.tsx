import { FC } from 'react';

import Menu from '../menu/menu';

import { useGenres } from './useGenres';

const GenreMenu: FC = () => {
	const { isLoading, data } = useGenres();

	if (isLoading) return null;

	return <Menu menu={{ title: 'Genres', items: data || [] }} />;
};

export default GenreMenu;
