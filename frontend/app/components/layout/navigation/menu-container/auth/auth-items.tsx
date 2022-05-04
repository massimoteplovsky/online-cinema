import { FC } from 'react';

import { useAuth } from '@/hooks/useAuth';

import { getAdminHomePath } from '@/configs/url.config';

import MenuItem from '../menu/menu-item';

import LogoutButton from './logout-btn';

const AuthItems: FC = () => {
	const { user } = useAuth();

	return (
		<>
			{user ? (
				<>
					<MenuItem
						item={{
							icon: 'MdPerson',
							link: '/profile',
							title: 'Profile',
						}}
					/>
					<LogoutButton />
				</>
			) : (
				<MenuItem item={{ icon: 'MdLogin', link: '/auth', title: 'Login' }} />
			)}

			{user?.isAdmin && (
				<MenuItem
					item={{
						icon: 'MdOutlineLock',
						link: getAdminHomePath(),
						title: 'Admin panel',
					}}
				/>
			)}
		</>
	);
};

export default AuthItems;
