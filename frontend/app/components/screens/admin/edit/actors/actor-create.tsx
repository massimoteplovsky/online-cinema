import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';

import SlugField from '@/components/ui/form-elements/slug-field/slug-field';
import UploadField from '@/components/ui/form-elements/upload-field/upload-field';

import AdminNavigation from '@/ui/admin-navigation/admin-navigation';
import s from '@/ui/form-elements/admin-form.module.scss';
import Button from '@/ui/form-elements/button';
import Field from '@/ui/form-elements/field';
import Heading from '@/ui/heading/heading';

import { generateSlug } from '@/utils/helpers';
import Meta from '@/utils/meta/meta';

import { IActorEdit } from './actor-edit.interface';
import { useActorCreate } from './useActorCreate';

const ActorCreate: FC = () => {
	const {
		handleSubmit,
		register,
		formState: { errors },
		setValue,
		getValues,
		control,
	} = useForm<IActorEdit>({
		mode: 'onChange',
	});

	const { onSubmit } = useActorCreate();

	return (
		<Meta title="Create actor">
			<AdminNavigation />
			<Heading title="Create actor" />

			<form onSubmit={handleSubmit(onSubmit)} className={s.form}>
				<div className={s.fields}>
					<Field
						{...register('name', {
							required: 'Name is required!',
						})}
						placeholder="Name"
						error={errors.name}
					/>
					<SlugField
						generate={() => setValue('slug', generateSlug(getValues('name')))}
						register={register}
						error={errors.slug}
					/>
					<Controller
						name="photo"
						control={control}
						defaultValue=""
						render={({ field: { value, onChange }, fieldState: { error } }) => (
							<UploadField
								placeholder="Photo"
								error={error}
								folder="actors"
								value={value}
								onChange={onChange}
							/>
						)}
						rules={{
							required: 'Photo is required!',
						}}
					/>
				</div>

				<Button>Create</Button>
			</form>
		</Meta>
	);
};

export default ActorCreate;
