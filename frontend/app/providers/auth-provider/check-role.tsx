import { useRouter } from 'next/router';
import { FC, ReactNode } from 'react';

import { useAuth } from '@/hooks/useAuth';

import { TRoles } from '@/shared/types/auth.types';

interface ComponentProps {
	Component: TRoles;
	children: ReactNode;
}

const CheckRole: FC<ComponentProps> = ({
	Component: { isAdminOnly, isUserOnly },
	children,
}) => {
	const { user } = useAuth();
	const router = useRouter();
	const Children = <>{children}</>;

	if (user?.isAdmin) {
		return Children;
	}

	if (isAdminOnly) {
		router.pathname !== '404' && router.replace('/404');
		return null;
	}

	if (user && !user?.isAdmin && isUserOnly) {
		return Children;
	} else {
		router.pathname !== '404' && router.replace('/auth');
		return null;
	}
};

export default CheckRole;
