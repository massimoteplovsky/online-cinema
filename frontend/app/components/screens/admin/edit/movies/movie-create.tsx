import dynamic from 'next/dynamic';
import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { stripHtml } from 'string-strip-html';

import SlugField from '@/components/ui/form-elements/slug-field/slug-field';
import UploadField from '@/components/ui/form-elements/upload-field/upload-field';
import SkeletonLoader from '@/components/ui/skeleton-loader';

import AdminNavigation from '@/ui/admin-navigation/admin-navigation';
import s from '@/ui/form-elements/admin-form.module.scss';
import Button from '@/ui/form-elements/button';
import Field from '@/ui/form-elements/field';
import Heading from '@/ui/heading/heading';

import { generateSlug } from '@/utils/helpers';
import Meta from '@/utils/meta/meta';

import { IMovieEdit } from './movie-edit.interface';
import { useAdminActors } from './useAdminActors';
import { useAdminGenres } from './useAdminGenres';
import { useMovieCreate } from './useMovieCreate';

const DynamicSelect = dynamic(() => import('@/components/ui/select/select'), {
	ssr: false,
});

const DynamicTextEditor = dynamic(
	() => import('@/components/ui/form-elements/text-editor'),
	{
		ssr: false,
	}
);

const MovieCreate: FC = () => {
	const {
		handleSubmit,
		register,
		formState: { errors },
		control,
		setValue,
		getValues,
	} = useForm<IMovieEdit>({
		mode: 'onChange',
	});

	const { onSubmit } = useMovieCreate();
	const { isLoading: isGenresLoading, data: genres } = useAdminGenres();
	const { isLoading: isActorsLoading, data: actors } = useAdminActors();

	return (
		<Meta title="Create movie">
			<AdminNavigation />
			<Heading title="Create movie" />

			<form onSubmit={handleSubmit(onSubmit)} className={s.form}>
				<div className={s.fields}>
					<Field
						{...register('title', {
							required: 'Title is required!',
						})}
						placeholder="Title"
						error={errors.title}
					/>
					<SlugField
						generate={() => setValue('slug', generateSlug(getValues('title')))}
						register={register}
						error={errors.slug}
					/>
					<Field
						style={{ width: '31%' }}
						{...register('parameters.country', {
							required: 'Country is required!',
						})}
						placeholder="Country"
						error={errors.parameters?.country}
					/>
					<Field
						style={{ width: '31%' }}
						{...register('parameters.duration', {
							required: 'Duration is required!',
						})}
						placeholder="Duration (min)"
						error={errors.parameters?.duration}
					/>
					<Field
						style={{ width: '31%' }}
						{...register('parameters.year', {
							required: 'Year is required!',
						})}
						placeholder="Year"
						error={errors.parameters?.year}
					/>
					<Controller
						name="genres"
						control={control}
						render={({ field, fieldState: { error } }) => (
							<DynamicSelect
								placeholder="Genres"
								error={error}
								field={field}
								isMulti
								isLoading={isGenresLoading}
								options={genres || []}
							/>
						)}
						rules={{
							required: 'Please select at least one genre',
						}}
					/>
					<Controller
						name="actors"
						control={control}
						render={({ field, fieldState: { error } }) => (
							<DynamicSelect
								placeholder="Actors"
								error={error}
								field={field}
								isMulti
								isLoading={isActorsLoading}
								options={actors || []}
							/>
						)}
						rules={{
							required: 'Please select at least one genre',
						}}
					/>
					<Controller
						name="poster"
						control={control}
						defaultValue=""
						render={({ field: { value, onChange }, fieldState: { error } }) => (
							<UploadField
								placeholder="Poster"
								error={error}
								folder="movies"
								value={value}
								onChange={onChange}
							/>
						)}
						rules={{
							required: 'Poster is required!',
						}}
					/>
					<Controller
						name="bigPoster"
						control={control}
						defaultValue=""
						render={({ field: { value, onChange }, fieldState: { error } }) => (
							<UploadField
								placeholder="Big Poster"
								error={error}
								folder="movies"
								value={value}
								onChange={onChange}
							/>
						)}
						rules={{
							required: 'Big Poster is required!',
						}}
					/>
					<Controller
						name="videoUrl"
						control={control}
						defaultValue=""
						render={({ field: { value, onChange }, fieldState: { error } }) => (
							<UploadField
								placeholder="Video"
								error={error}
								folder="movies"
								value={value}
								onChange={onChange}
								style={{ marginTop: '-25px' }}
								isNoImage
							/>
						)}
						rules={{
							required: 'Video is required!',
						}}
					/>
					<Controller
						name="description"
						control={control}
						defaultValue=""
						render={({ field: { value, onChange }, fieldState: { error } }) => (
							<DynamicTextEditor
								placeholder="Description"
								onChange={onChange}
								error={error}
								value={value}
							/>
						)}
						rules={{
							validate: {
								required: (v) =>
									(v && stripHtml(v).result.length > 0) ||
									'Description is required!',
							},
						}}
					/>
				</div>
				<Button>Create</Button>
			</form>
		</Meta>
	);
};

export default MovieCreate;
