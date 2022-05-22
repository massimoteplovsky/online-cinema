import Link from 'next/link';
import React from 'react';

import AdminHeader from '@/components/ui/admin-table/admin-header/admin-header';
import AdminTable from '@/components/ui/admin-table/admin-table';
import Heading from '@/components/ui/heading/heading';

import Meta from '@/utils/meta/meta';

import { getAdminPath } from '@/configs/url.config';

import AdminNavigation from '../../../ui/admin-navigation/admin-navigation';
import s from '../admin.module.scss';

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
			<div className={s.adminHeading}>
				<Heading title="Users" className="text-4xl" />
				<Link href={getAdminPath('/movies/create')}>
					<a className={s.button}>Create</a>
				</Link>
			</div>

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
