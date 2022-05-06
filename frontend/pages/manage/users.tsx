import UsersList from '@/components/screens/admin/users/users-list';

import { NextPageAuth } from '@/shared/types/auth.types';

const UsersListPage: NextPageAuth = () => {
	return <UsersList />;
};

UsersListPage.isAdminOnly = true;

export default UsersList;
