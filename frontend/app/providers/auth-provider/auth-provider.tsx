import Cookies from 'js-cookie';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { FC, ReactNode, useEffect } from 'react';

import { useActions } from '@/hooks/useActions';
import { useAuth } from '@/hooks/useAuth';

import { TRoles } from '@/shared/types/auth.types';

const DynamicCheckRole = dynamic(import('./check-role'), { ssr: false });

interface ComponentProps {
	Component: TRoles;
	children: ReactNode;
}

const AuthProvider: FC<ComponentProps> = ({
	Component: { isAdminOnly, isUserOnly },
	children,
}) => {
	const { user } = useAuth();
	const { logout, checkAuth } = useActions();
	const { pathname } = useRouter();

	useEffect(() => {
		const accessToken = Cookies.get('accessToken');
		accessToken && checkAuth();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		const refreshToken = Cookies.get('refreshToken');
		if (!refreshToken && user) logout();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pathname]);

	return !isAdminOnly && !isUserOnly ? (
		<>{children}</>
	) : (
		<DynamicCheckRole Component={{ isAdminOnly, isUserOnly }}>
			{children}
		</DynamicCheckRole>
	);
};

export default AuthProvider;
