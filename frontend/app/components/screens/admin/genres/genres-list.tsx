import { FC } from 'react';

import AdminNavigation from '@/components/ui/admin-navigation/admin-navigation';
import AdminHeader from '@/components/ui/admin-table/admin-header/admin-header';
import AdminTable from '@/components/ui/admin-table/admin-table';
import Heading from '@/components/ui/heading/heading';

import Meta from '@/utils/meta/meta';

import { useGenres } from './useGenres';

const headerItems = ['Name', 'Slug'];

const GenresList: FC = () => {
	const {
		isLoading,
		handleSearch,
		searchText,
		deleteGenre,
		data: usersList = [],
	} = useGenres();
	return (
		<Meta title="Genres">
			<AdminNavigation />
			<Heading title="Genres" className="text-4xl" />
			<AdminHeader searchText={searchText} handleSearch={handleSearch} />
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
