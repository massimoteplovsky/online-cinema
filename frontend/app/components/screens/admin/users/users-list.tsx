import React from 'react';

import AdminHeader from '@/components/ui/admin-table/admin-header/admin-header';
import AdminTable from '@/components/ui/admin-table/admin-table';
import Heading from '@/components/ui/heading/heading';

import Meta from '@/utils/meta/meta';

import AdminNavigation from '../../../ui/admin-navigation/admin-navigation';

import { useUsers } from './useUsers';

const headerItems = ['Email', 'Registration date'];

const UsersList = () => {
	const {
		isLoading,
		handleSearch,
		searchText,
		deleteUser,
		data: usersList = [],
	} = useUsers();
	return (
		<Meta title="Users">
			<AdminNavigation />
			<Heading title="Users" className="text-4xl" />
			<AdminHeader searchText={searchText} handleSearch={handleSearch} />
			<AdminTable
				tableItems={usersList}
				isLoading={isLoading}
				headerItems={headerItems}
				removeHandler={deleteUser}
			/>
		</Meta>
	);
};

export default UsersList;
