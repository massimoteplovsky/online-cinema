import { useRouter } from 'next/router';
import { SubmitHandler, UseFormSetValue } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import { toastr } from 'react-redux-toastr';

import { GenreService } from '@/services/genre.service';

import { toastrError } from '@/utils/toastr-error';

import { getAdminPath } from '@/configs/url.config';

import { IGenreEdit } from './genres-edit.interface';

export const useGenreCreate = () => {
	const { push } = useRouter();

	const { mutateAsync: createGenre } = useMutation(
		'Create genre',
		(genreData: IGenreEdit) => GenreService.createGenre(genreData),
		{
			onError: (error) => {
				toastrError(error, 'Genre create error');
			},
			onSuccess: () => {
				toastr.success('Create genre', 'created successfully');
				push(getAdminPath('/genres'));
			},
		}
	);

	const onSubmit: SubmitHandler<IGenreEdit> = (genreData) => {
		createGenre(genreData);
	};

	return {
		onSubmit,
	};
};
