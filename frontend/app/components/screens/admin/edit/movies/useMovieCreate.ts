import { useRouter } from 'next/router';
import { SubmitHandler, UseFormSetValue } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import { toastr } from 'react-redux-toastr';

import { MovieService } from '@/services/movie.service';

import { toastrError } from '@/utils/toastr-error';

import { getAdminPath } from '@/configs/url.config';

import { IMovieEdit } from './movie-edit.interface';

export const useMovieCreate = () => {
	const { push } = useRouter();

	const { mutateAsync: createMovie } = useMutation(
		'Create movie',
		(movieData: IMovieEdit) => MovieService.createMovie(movieData),
		{
			onError: (error) => {
				toastrError(error, 'Movie create error');
			},
			onSuccess: () => {
				toastr.success('Create movie', 'created successfully');
				push(getAdminPath('/movies'));
			},
		}
	);

	const onSubmit: SubmitHandler<IMovieEdit> = (genreData) => {
		createMovie(genreData);
	};

	return {
		onSubmit,
	};
};
