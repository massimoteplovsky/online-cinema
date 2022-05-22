import React from 'react';

import ActorCreate from '@/components/screens/admin/edit/actors/actor-create';

import { NextPageAuth } from '@/shared/types/auth.types';

const ActorEditPage: NextPageAuth = () => {
	return <ActorCreate />;
};

export default ActorEditPage;
