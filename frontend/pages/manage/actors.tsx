import ActorsList from '@/components/screens/admin/actors/actors-list';

import { NextPageAuth } from '@/shared/types/auth.types';

const ActorsListPage: NextPageAuth = () => {
	return <ActorsList />;
};

ActorsListPage.isAdminOnly = true;

export default ActorsListPage;
