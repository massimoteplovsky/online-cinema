import GenresList from '@/components/screens/admin/genres/genres-list';

import { NextPageAuth } from '@/shared/types/auth.types';

const GenresListPage: NextPageAuth = () => {
	return <GenresList />;
};

GenresListPage.isAdminOnly = true;

export default GenresListPage;
