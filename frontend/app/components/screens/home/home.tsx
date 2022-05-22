import { FC } from 'react';

import Heading from '@/components/ui/heading/heading';
import Slider from '@/components/ui/slider/slider';

import Meta from '@/utils/meta/meta';

import { IHome } from './home.interface';

const Home: FC<IHome> = ({ slides }) => {
	return (
		<Meta
			title="Watch movies online"
			description="Watch movies online or stream right to your browser"
		>
			<Heading
				title="Watch video online"
				className="text-gray-500 mb-8 text-xl"
			/>
			{slides.length && <Slider slides={slides} />}
		</Meta>
	);
};

export default Home;
