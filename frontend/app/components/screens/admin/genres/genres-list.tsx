import Link from 'next/link';
import { FC } from 'react';

import AdminNavigation from '@/components/ui/admin-navigation/admin-navigation';
import AdminHeader from '@/components/ui/admin-table/admin-header/admin-header';
import AdminTable from '@/components/ui/admin-table/admin-table';
import Button from '@/components/ui/form-elements/button';
import Heading from '@/components/ui/heading/heading';

import Meta from '@/utils/meta/meta';

import { getAdminPath } from '@/configs/url.config';

import s from '../admin.module.scss';

import { useGenres } from './useGenres';

const headerItems = ['Name', 'Slug'];

const GenresList: FC = () => {
	const {
		isLoading,
		handleSearch,
		handleClick,
		searchText,
		deleteGenre,
		data: usersList = [],
	} = useGenres();
	return (
		<Meta title="Genres">
			<AdminNavigation />
			<Heading title="Genres" className="text-4xl" />
			<AdminHeader
				searchText={searchText}
				handleSearch={handleSearch}
				onClick={handleClick}
			/>
			<AdminTable
				tableItems={usersList}
				isLoading={isLoading}
				headerItems={headerItems}
				removeHandler={deleteGenre}
			/>
		</Meta>
	);
};

export default GenresList;
