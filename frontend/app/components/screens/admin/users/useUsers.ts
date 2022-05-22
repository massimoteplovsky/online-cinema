import { ChangeEvent, useMemo, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { toastr } from 'react-redux-toastr';

import { ITableItem } from '@/components/ui/admin-table/admin-table.interface';

import { useDebounce } from '@/hooks/useDebounce';

import { UserService } from '@/services/user.service';

import { toastrError } from '@/utils/toastr-error';

import { getAdminPath } from '@/configs/url.config';

export const useUsers = () => {
	const [searchText, setSearchText] = useState<string>('');
	const debouncedSearch = useDebounce(searchText, 500);

	const queryData = useQuery(
		['Search users', debouncedSearch],
		() => UserService.getUsers(debouncedSearch),
		{
			select: ({ data }) =>
				data.map(
					(user): ITableItem => ({
						_id: user._id,
						editUrl: getAdminPath(`/users/edit/${user._id}`),
						items: [
							user.email,
							new Date(user.createdAt).toLocaleDateString('ru'),
						],
					})
				),
			onError: (error) => {
				toastrError(error, 'User error');
			},
		}
	);

	const { mutateAsync: deleteUser } = useMutation(
		'Delete user',
		(userId: string) => UserService.deleteUser(userId),
		{
			onError: (error) => {
				toastrError(error, 'User error');
			},
			onSuccess: () => {
				toastr.success('Delete user', 'deleted successfully');
				queryData.refetch();
			},
		}
	);

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchText(e.target.value);
	};

	return useMemo(
		() => ({ searchText, ...queryData, handleSearch, deleteUser }),
		[queryData, searchText, deleteUser]
	);
};
