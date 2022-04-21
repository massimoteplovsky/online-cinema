import { FC } from 'react';

import Heading from '@/components/ui/heading/heading';

import Meta from '@/utils/meta/meta';

import { IHome } from './home.interface';

const Home: FC<IHome> = () => {
	return (
		<Meta
			title="Watch movies online"
			description="Watch movies online or stream right to your browser"
		>
			<Heading
				title="Watch video online"
				className="text-gray-500 mb-8 text-xl"
			/>
		</Meta>
	);
};

export default Home;
