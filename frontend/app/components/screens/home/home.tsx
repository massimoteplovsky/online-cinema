import { FC } from 'react';

import Gallery from '@/components/ui/gallery/gallery';
import Heading from '@/components/ui/heading/heading';
import SubHeading from '@/components/ui/heading/sub-heading';
import Slider from '@/components/ui/slider/slider';

import Meta from '@/utils/meta/meta';

import { IHome } from './home.interface';

const Home: FC<IHome> = ({ slides, movies = [], actors }) => {
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
			{movies.length && (
				<div className="my-10">
					<SubHeading title="Tranding movies" />
					<Gallery items={movies} />
				</div>
			)}
			{actors.length && (
				<div className="my-10">
					<SubHeading title="Best actors" />
					<Gallery items={actors} />
				</div>
			)}
		</Meta>
	);
};

export default Home;
