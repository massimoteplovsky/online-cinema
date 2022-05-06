import { ChangeEvent, useMemo, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { toastr } from 'react-redux-toastr';

import { ITableItem } from '@/components/ui/admin-table/admin-table.interface';

import { useDebounce } from '@/hooks/useDebounce';

import { ActorService } from '@/services/actor.service';

import { toastrError } from '@/utils/toastr-error';

import { getActorsUrl } from '@/configs/api.config';

export const useActors = () => {
	const [searchText, setSearchText] = useState<string>('');
	const debouncedSearch = useDebounce(searchText, 500);

	const queryData = useQuery(
		['Search actors', debouncedSearch],
		() => ActorService.getActors(debouncedSearch),
		{
			select: ({ data }) =>
				data.map(
					(actor): ITableItem => ({
						_id: actor._id,
						editUrl: getActorsUrl(`/edit/${actor._id}`),
						items: [actor.name, String(actor.countMovies)],
					})
				),
			onError: (error) => {
				toastrError(error, 'Actor error');
			},
		}
	);

	const { mutateAsync: deleteActor } = useMutation(
		'Delete actor',
		(actorId: string) => ActorService.deleteActor(actorId),
		{
			onError: (error) => {
				toastrError(error, 'Actor delete error');
			},
			onSuccess: () => {
				toastr.success('Delete actor', 'deleted successfully');
				queryData.refetch();
			},
		}
	);

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchText(e.target.value);
	};

	return useMemo(
		() => ({ searchText, ...queryData, handleSearch, deleteActor }),
		[queryData, searchText, deleteActor]
	);
};
