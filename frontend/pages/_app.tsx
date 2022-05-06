import type { AppProps } from 'next/app';
import MainProvider from 'providers/main-provider';

import { TypeComponentAuthFields } from '@/shared/types/auth.types';

import '@/assets/styles/globals.scss';

type TAppProps = TypeComponentAuthFields & AppProps;

const MyApp = ({ pageProps, Component }: TAppProps) => {
	return (
		<MainProvider Component={Component}>
			<Component {...pageProps} />
		</MainProvider>
	);
};

export default MyApp;
