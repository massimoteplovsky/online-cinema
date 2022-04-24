import React from 'react';

import SearchField from '@/components/ui/search-field/search-field';

import SearchList from '../search-list/search-list';
import { useSearch } from '../useSearch';

import s from './search.module.scss';

const Search = () => {
	const { isSuccess, searchText, data: movies, handleSearch } = useSearch();

	return (
		<div className={s.wrapper}>
			<SearchField searchText={searchText} onChange={handleSearch} />
			{isSuccess && <SearchList movies={movies || []} />}
		</div>
	);
};

export default Search;
