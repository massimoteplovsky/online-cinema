import { FC } from 'react';

import AuthButton from './auth-button';
import s from './auth-placeholder.module.scss';

const AuthPlaceholder: FC<{ slug: string }> = ({ slug }) => {
	return (
		<div className={s.placeholder}>
			<div>
				<div>You must be logged in to start watching this movie</div>
				<AuthButton slug={slug} />
			</div>
		</div>
	);
};

export default AuthPlaceholder;
