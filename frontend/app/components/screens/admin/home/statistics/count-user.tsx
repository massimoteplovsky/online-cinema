import cn from 'classnames';
import { FC } from 'react';
import { useQuery } from 'react-query';

import SkeletonLoader from '@/components/ui/skeleton-loader';

import { AdminService } from '@/services/admin.service';

import s from '../admin.module.scss';

const CountUser: FC = () => {
	const { isLoading, data: usersCount } = useQuery(
		'Get count users',
		async () => {
			return AdminService.getUsersCount();
		},
		{
			select: ({ data }) => data,
		}
	);

	return (
		<div className={cn(s.block, s.countUsers)}>
			<div>
				{isLoading ? (
					<SkeletonLoader />
				) : (
					<div className={s.number}>{usersCount}</div>
				)}
				<div className={s.description}>
					{usersCount! > 1 ? 'Users' : 'User'}
				</div>
			</div>
		</div>
	);
};

export default CountUser;
