import { ChangeEvent, useState } from 'react';
import { useQuery } from 'react-query';

import { useDebounce } from '@/hooks/useDebounce';

import { MovieService } from '@/services/movie.search';

export const useSearch = () => {
	const [searchText, setSearchText] = useState<string>('');
	const debouncedSearch = useDebounce(searchText, 500);

	const { isSuccess, data } = useQuery(
		['search movie', debouncedSearch],
		() => MovieService.getMovies(debouncedSearch),
		{
			select: ({ data }) => data,
			enabled: !!debouncedSearch,
		}
	);

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchText(e.target.value);
	};

	return { isSuccess, searchText, data, handleSearch };
};
