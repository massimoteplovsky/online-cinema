import Admin from '@/components/screens/admin/home/admin';

import { NextPageAuth } from '@/shared/types/auth.types';

const AdminHomePage: NextPageAuth = () => {
	return <Admin />;
};

AdminHomePage.isAdminOnly = true;

export default AdminHomePage;
