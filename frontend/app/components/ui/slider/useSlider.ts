import { useState } from 'react';

export const useSlider = (slidesLength: number) => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [slideIn, setSlideIn] = useState(true);

	const isNextSlideExists = currentIndex + 1 < slidesLength;
	const isPrevSlideExists = currentIndex
		? currentIndex - 1 < slidesLength
		: false;

	const handleArrowClick = (direction: 'next' | 'prev') => {
		const newIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
		setSlideIn(false);

		setTimeout(() => {
			setCurrentIndex(newIndex);
			setSlideIn(true);
		}, 300);
	};

	return {
		handleArrowClick,
		isNextSlideExists,
		isPrevSlideExists,
		slideIn,
		currentIndex,
	};
};
