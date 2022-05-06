import { FC } from 'react';

import AdminNavigation from '@/components/ui/admin-navigation/admin-navigation';
import AdminHeader from '@/components/ui/admin-table/admin-header/admin-header';
import AdminTable from '@/components/ui/admin-table/admin-table';
import Heading from '@/components/ui/heading/heading';

import Meta from '@/utils/meta/meta';

import { useActors } from './useActors';

const headerItems = ['Name', 'Movies'];

const ActorsList: FC = () => {
	const {
		isLoading,
		handleSearch,
		searchText,
		deleteActor,
		data: actorsList = [],
	} = useActors();
	return (
		<Meta title="Actors">
			<AdminNavigation />
			<Heading title="Actors" className="text-4xl" />
			<AdminHeader searchText={searchText} handleSearch={handleSearch} />
			<AdminTable
				tableItems={actorsList}
				isLoading={isLoading}
				headerItems={headerItems}
				removeHandler={deleteActor}
			/>
		</Meta>
	);
};

export default ActorsList;
