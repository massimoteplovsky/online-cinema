import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import Button from '@/components/ui/form-elements/button';
import Field from '@/components/ui/form-elements/field';
import Heading from '@/components/ui/heading/heading';

import { useActions } from '@/hooks/useActions';
import { useAuth } from '@/hooks/useAuth';

import Meta from '@/utils/meta/meta';

import { IAuth } from './auth.interface';
import s from './auth.module.scss';
import { useAuthRedirect } from './useAuthRedirect';

const Auth = () => {
	useAuthRedirect();
	const { isLoading } = useAuth();
	const [formType, setFormType] = useState<'login' | 'register'>('login');
	const {
		register: registerInput,
		handleSubmit,
		formState: { isValid, errors },
		reset,
	} = useForm<IAuth>({
		mode: 'onChange',
	});
	const { register, login } = useActions();

	const onSubmit: SubmitHandler<IAuth> = (data) => {
		formType === 'register' ? register(data) : login(data);
		reset();
	};

	return (
		<Meta title="Auth">
			<section className={s.wrapper}>
				<form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
					<Heading title="Auth" className="mb-6" />
					<Field
						type="email"
						placeholder="email"
						error={errors['email']}
						{...registerInput('email', { required: 'Email is required' })}
					/>
					<Field
						type="password"
						placeholder="password"
						error={errors['password']}
						{...registerInput('password', {
							required: 'Password is required',
							minLength: {
								value: 6,
								message: 'Minimum length is 6 characters',
							},
						})}
					/>
					<div className={s.buttons}>
						<Button
							type="submit"
							onClick={() => setFormType('login')}
							disabled={isLoading}
						>
							Login
						</Button>
						<Button
							type="submit"
							onClick={() => setFormType('register')}
							disabled={isLoading}
						>
							Register
						</Button>
					</div>
				</form>
			</section>
		</Meta>
	);
};

export default Auth;
