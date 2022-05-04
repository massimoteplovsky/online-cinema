import cn from 'classnames';
import { FC } from 'react';

import s from './form-elements.module.scss';
import { IButton } from './form.interface';

const Button: FC<IButton> = ({ children, className, ...props }) => {
	return (
		<button className={cn(s.button, className)} {...props}>
			{children}
		</button>
	);
};

export default Button;
