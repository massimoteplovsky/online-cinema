import { useRouter } from 'next/router';
import { SubmitHandler, UseFormSetValue } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import { toastr } from 'react-redux-toastr';

import { GenreService } from '@/services/genre.service';

import { toastrError } from '@/utils/toastr-error';

import { getAdminPath } from '@/configs/url.config';

import { IGenreEdit } from './genres-edit.interface';

export const getKeys = <T>(obj: T) => Object.keys(obj) as Array<keyof T>;

export const useGenreEdit = (setValue: UseFormSetValue<IGenreEdit>) => {
	const { push, query } = useRouter();
	const genreId = String(query.id);

	const { isLoading } = useQuery(
		['Get genre to edit', genreId],
		() => GenreService.getGenreById(genreId),
		{
			onSuccess({ data }) {
				getKeys(data).forEach((key) => {
					setValue(key, data[key]);
				});
			},
			onError(error) {
				toastrError(error, 'Get genre');
			},
			enabled: !!query.id,
		}
	);

	const { mutateAsync: updateGenre } = useMutation(
		'Update genre',
		(genreData: IGenreEdit) => GenreService.updateGenre(genreId, genreData),
		{
			onError: (error) => {
				toastrError(error, 'Update genre error');
			},
			onSuccess: () => {
				toastr.success('Update genre', 'updated successfully');
				push(getAdminPath('/genres'));
			},
		}
	);

	const onSubmit: SubmitHandler<IGenreEdit> = (genreData) => {
		updateGenre(genreData);
	};

	return {
		isLoading,
		onSubmit,
	};
};
