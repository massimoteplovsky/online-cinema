import { ChangeEvent, useMemo, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { toastr } from 'react-redux-toastr';

import { ITableItem } from '@/components/ui/admin-table/admin-table.interface';

import { useDebounce } from '@/hooks/useDebounce';

import { GenreService } from '@/services/genre.service';

import { toastrError } from '@/utils/toastr-error';

import { getGenresUrl } from '@/configs/api.config';

export const useGenres = () => {
	const [searchText, setSearchText] = useState<string>('');
	const debouncedSearch = useDebounce(searchText, 500);

	const queryData = useQuery(
		['Search genres', debouncedSearch],
		() => GenreService.getGenres(debouncedSearch),
		{
			select: ({ data }) =>
				data.map(
					(genre): ITableItem => ({
						_id: genre._id,
						editUrl: getGenresUrl(`/edit/${genre._id}`),
						items: [genre.name, genre.slug],
					})
				),
			onError: (error) => {
				toastrError(error, 'Genre error');
			},
		}
	);

	const { mutateAsync: deleteGenre } = useMutation(
		'Delete genre',
		(genreId: string) => GenreService.deleteGenre(genreId),
		{
			onError: (error) => {
				toastrError(error, 'Genre delete error');
			},
			onSuccess: () => {
				toastr.success('Delete genre', 'deleted successfully');
				queryData.refetch();
			},
		}
	);

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchText(e.target.value);
	};

	return useMemo(
		() => ({ searchText, ...queryData, handleSearch, deleteGenre }),
		[queryData, searchText, deleteGenre]
	);
};
