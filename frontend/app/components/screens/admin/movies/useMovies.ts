import { ChangeEvent, useMemo, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { toastr } from 'react-redux-toastr';

import { ITableItem } from '@/components/ui/admin-table/admin-table.interface';

import { useDebounce } from '@/hooks/useDebounce';

import { MovieService } from '@/services/movie.service';

import { toastrError } from '@/utils/toastr-error';

import { getMoviesUrl } from '@/configs/api.config';

export const useMovies = () => {
	const [searchText, setSearchText] = useState<string>('');
	const debouncedSearch = useDebounce(searchText, 500);

	const queryData = useQuery(
		['Search movies', debouncedSearch],
		() => MovieService.getMovies(debouncedSearch),
		{
			select: ({ data }) =>
				data.map(
					(movie): ITableItem => ({
						_id: movie._id,
						editUrl: getMoviesUrl(`/edit/${movie._id}`),
						items: [
							movie.title,
							movie.genres.map(({ name }) => name).join(', '),
							String(movie.rating),
						],
					})
				),
			onError: (error) => {
				toastrError(error, 'User error');
			},
		}
	);

	const { mutateAsync: deleteMovie } = useMutation(
		'Delete movie',
		(movieId: string) => MovieService.deleteMovie(movieId),
		{
			onError: (error) => {
				toastrError(error, 'Movie delete error');
			},
			onSuccess: () => {
				toastr.success('Delete movie', 'deleted successfully');
				queryData.refetch();
			},
		}
	);

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchText(e.target.value);
	};

	return useMemo(
		() => ({ searchText, ...queryData, handleSearch, deleteMovie }),
		[queryData, searchText, deleteMovie]
	);
};
