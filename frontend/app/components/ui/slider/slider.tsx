import { FC } from 'react';
import { CSSTransition } from 'react-transition-group';

import SlideArrow from './slide-arrow/slide-arrow';
import SlideItem from './slide-item';
import { ISlide } from './slider.interface';
import s from './slider.module.scss';
import { useSlider } from './useSlider';

interface ISlider {
	slides: ISlide[];
	buttonTitle?: string;
}

const Slider: FC<ISlider> = ({ slides, buttonTitle }) => {
	const {
		currentIndex,
		isNextSlideExists,
		isPrevSlideExists,
		handleArrowClick,
		slideIn,
	} = useSlider(slides.length);

	return (
		<div className={s.slider}>
			<CSSTransition
				classNames="slide-animation"
				in={slideIn}
				timeout={300}
				unmountOnExit
			>
				<SlideItem slide={slides[currentIndex]} buttonTitle={buttonTitle} />
			</CSSTransition>

			{isPrevSlideExists && (
				<SlideArrow
					variant="left"
					clickHandler={() => handleArrowClick('prev')}
				/>
			)}
			{isNextSlideExists && (
				<SlideArrow
					variant="right"
					clickHandler={() => handleArrowClick('next')}
				/>
			)}
		</div>
	);
};

export default Slider;
