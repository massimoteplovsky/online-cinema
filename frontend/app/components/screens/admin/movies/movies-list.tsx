import { FC } from 'react';

import AdminNavigation from '@/components/ui/admin-navigation/admin-navigation';
import AdminHeader from '@/components/ui/admin-table/admin-header/admin-header';
import AdminTable from '@/components/ui/admin-table/admin-table';
import Heading from '@/components/ui/heading/heading';

import Meta from '@/utils/meta/meta';

import { useMovies } from './useMovies';

const headerItems = ['Title', 'Genres', 'Rating'];

const MoviesList: FC = () => {
	const {
		isLoading,
		handleSearch,
		searchText,
		deleteMovie,
		handleClick,
		data: usersList = [],
	} = useMovies();
	return (
		<Meta title="Movies">
			<AdminNavigation />
			<Heading title="Movies" className="text-4xl" />
			<AdminHeader
				searchText={searchText}
				handleSearch={handleSearch}
				onClick={handleClick}
			/>
			<AdminTable
				tableItems={usersList}
				isLoading={isLoading}
				headerItems={headerItems}
				removeHandler={deleteMovie}
			/>
		</Meta>
	);
};

export default MoviesList;
