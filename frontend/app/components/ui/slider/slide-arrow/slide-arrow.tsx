import cn from 'classnames';
import { FC } from 'react';

import MaterialIcon from '../../material-icon';

import s from './slide-arrow.module.scss';

interface ISliderArrow {
	variant: 'left' | 'right';
	clickHandler: () => void;
}

const SlideArrow: FC<ISliderArrow> = ({ variant, clickHandler }) => {
	const isLeft = variant === 'left';

	return (
		<button
			className={cn(s.arrow, { [s.left]: isLeft, [s.right]: !isLeft })}
			onClick={clickHandler}
		>
			<MaterialIcon name={isLeft ? 'MdChevronLeft' : 'MdChevronRight'} />
		</button>
	);
};

export default SlideArrow;
