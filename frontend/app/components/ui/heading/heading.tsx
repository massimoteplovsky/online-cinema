import cn from 'classnames';
import { FC } from 'react';

interface IHeading {
	title: string;
	className?: string;
}

const Heading: FC<IHeading> = ({ title, className }) => {
	return (
		<h1
			className={cn('text-white text-opacity-80 font-semibold', className, {
				'text-3xl': className?.includes('xl'),
			})}
		>
			{title}
		</h1>
	);
};

export default Heading;
