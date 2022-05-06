import MoviesList from '@/components/screens/admin/movies/movies-list';

import { NextPageAuth } from '@/shared/types/auth.types';

const MoviesListPage: NextPageAuth = () => {
	return <MoviesList />;
};

MoviesListPage.isAdminOnly = true;

export default MoviesListPage;
