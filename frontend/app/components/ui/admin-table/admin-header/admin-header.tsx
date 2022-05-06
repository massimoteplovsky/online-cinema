import { ChangeEvent, FC } from 'react';

import SearchField from '../../search-field/search-field';

import AdminCreateButton from './admin-create-button/admin-create-button';
import s from './admin-header.module.scss';

interface IAdminHeader {
	onClick?: () => void;
	searchText: string;
	handleSearch: (event: ChangeEvent<HTMLInputElement>) => void;
}

const AdminHeader: FC<IAdminHeader> = ({
	searchText,
	handleSearch,
	onClick,
}) => {
	return (
		<div className={s.header}>
			<SearchField searchText={searchText} onChange={handleSearch} />
			{onClick && <AdminCreateButton onClick={onClick} />}
		</div>
	);
};

export default AdminHeader;
