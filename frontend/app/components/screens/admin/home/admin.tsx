import React from 'react';

import Heading from '@/components/ui/heading/heading';

import Meta from '@/utils/meta/meta';

import AdminNavigation from '../../../ui/admin-navigation/admin-navigation';

import Statistics from './statistics/statistics';

const Admin = () => {
	return (
		<Meta title="Admin panel">
			<AdminNavigation />
			<Heading title="Statistics" className="text-4xl" />
			<Statistics />
		</Meta>
	);
};

export default Admin;
