import { ChangeEvent, FC } from 'react';

import MaterialIcon from '../material-icon';

import s from './search-field.module.scss';

interface ISearchField {
	searchText: string;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const SearchField: FC<ISearchField> = ({ searchText, onChange }) => {
	return (
		<div className={s.search}>
			<MaterialIcon name="MdSearch" />
			<input
				type="text"
				placeholder="Search"
				value={searchText}
				onChange={onChange}
			/>
		</div>
	);
};

export default SearchField;
