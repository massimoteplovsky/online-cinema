import { useRouter } from 'next/router';
import { SubmitHandler, UseFormSetValue } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import { toastr } from 'react-redux-toastr';

import { MovieService } from '@/services/movie.service';

import { toastrError } from '@/utils/toastr-error';

import { getAdminPath } from '@/configs/url.config';

import { IMovieEdit } from './movie-edit.interface';

export const getKeys = <T>(obj: T) => Object.keys(obj) as Array<keyof T>;

export const useMovieEdit = (setValue: UseFormSetValue<IMovieEdit>) => {
	const { push, query } = useRouter();
	const movieId = String(query.id);

	const { isLoading } = useQuery(
		['Get movie to edit', movieId],
		() => MovieService.getMovieById(movieId),
		{
			onSuccess({ data }) {
				getKeys(data).forEach((key) => {
					setValue(key, data[key]);
				});
			},
			onError(error) {
				toastrError(error, 'Get movie');
			},
			enabled: !!query.id,
		}
	);

	const { mutateAsync: updateMovie } = useMutation(
		'Update movie',
		(movieData: IMovieEdit) => MovieService.updateMovie(movieId, movieData),
		{
			onError: (error) => {
				toastrError(error, 'Update movie error');
			},
			onSuccess: () => {
				toastr.success('Update movie', 'updated successfully');
				push(getAdminPath('/movies'));
			},
		}
	);

	const onSubmit: SubmitHandler<IMovieEdit> = (movieData) => {
		updateMovie(movieData);
	};

	return {
		isLoading,
		onSubmit,
	};
};
