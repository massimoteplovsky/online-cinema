import { FC } from 'react';
import { FieldError, UseFormRegister } from 'react-hook-form';

import Field from '../field';

import s from './slug-field.module.scss';

interface ISlugField {
	error?: FieldError;
	register: UseFormRegister<any>;
	generate: () => void;
}

const SlugField: FC<ISlugField> = ({ error, register, generate }) => {
	return (
		<div className="relative">
			<Field
				type="text"
				error={error}
				placeholder="Enter or generate slug"
				{...register('slug', { required: 'Genre slug is required' })}
			/>
			<div className={s.badge} onClick={generate}>
				Generate
			</div>
		</div>
	);
};

export default SlugField;
