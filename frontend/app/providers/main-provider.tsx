import { FC, ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';

import Layout from '@/components/layout/layout';

import { TRoles } from '@/shared/types/auth.types';

import { store } from '@/store/store';

import AuthProvider from './auth-provider/auth-provider';
import HeadProvider from './header-provider/header-provider';
import ReaduxToastr from './redux-toastr';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
});

interface ComponentProps {
	children: ReactNode;
	Component: TRoles;
}

const MainProvider: FC<ComponentProps> = ({ children, Component }) => {
	return (
		<HeadProvider>
			<Provider store={store}>
				<QueryClientProvider client={queryClient}>
					<ReaduxToastr />
					<AuthProvider Component={Component}>
						<Layout>{children}</Layout>
					</AuthProvider>
				</QueryClientProvider>
			</Provider>
		</HeadProvider>
	);
};

export default MainProvider;
