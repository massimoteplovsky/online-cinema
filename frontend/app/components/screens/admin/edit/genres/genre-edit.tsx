import dynamic from 'next/dynamic';
import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { stripHtml } from 'string-strip-html';

import AdminNavigation from '@/components/ui/admin-navigation/admin-navigation';
import Button from '@/components/ui/form-elements/button';
import Field from '@/components/ui/form-elements/field';
import SlugField from '@/components/ui/form-elements/slug-field/slug-field';
import Heading from '@/components/ui/heading/heading';
import SkeletonLoader from '@/components/ui/skeleton-loader';

import s from '@/ui/form-elements/admin-form.module.scss';

import { generateSlug } from '@/utils/helpers';
import Meta from '@/utils/meta/meta';

import { IGenreEdit } from './genres-edit.interface';
import { useGenreEdit } from './useGenresEdit';

const DynamicTextEditor = dynamic(
	() => import('@/components/ui/form-elements/text-editor'),
	{
		ssr: false,
	}
);

const GenreEdit: FC = () => {
	const {
		handleSubmit,
		register,
		setValue,
		getValues,
		control,
		formState: { errors },
	} = useForm<IGenreEdit>({
		mode: 'onChange',
	});

	const { isLoading, onSubmit } = useGenreEdit(setValue);

	return (
		<Meta title="Genre edit">
			<AdminNavigation />
			<Heading title="Edit genre" className="text-xl mb-4" />
			<form className={s.form} onSubmit={handleSubmit(onSubmit)}>
				{isLoading ? (
					<SkeletonLoader count={3} />
				) : (
					<>
						<div className={s.fields}>
							<Field
								style={{ width: '31%' }}
								type="text"
								error={errors['name']}
								placeholder="Enter name"
								{...register('name', { required: 'Genre name is required' })}
							/>
							<div style={{ width: '31%' }}>
								<SlugField
									register={register}
									error={errors['slug']}
									generate={() => {
										setValue('slug', generateSlug(getValues('name')));
									}}
								/>
							</div>
							<Field
								style={{ width: '31%' }}
								type="text"
								error={errors['icon']}
								placeholder="Enter icon name"
								{...register('icon', {
									required: 'Genre icon is required',
								})}
							/>
						</div>
						<Controller
							name="description"
							control={control}
							defaultValue=""
							render={({
								field: { value, onChange },
								fieldState: { error },
							}) => (
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
						<Button>Edit</Button>
					</>
				)}
			</form>
		</Meta>
	);
};

export default GenreEdit;
