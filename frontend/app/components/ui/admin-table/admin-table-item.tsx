import { FC } from 'react';

import AdminActions from './admin-actions/admin-actions';
import { IAdminTableItem } from './admin-table.interface';
import s from './admin-table.module.scss';

const AdminTableItem: FC<IAdminTableItem> = ({ item, removeHandler }) => {
	return (
		<div className={s.item}>
			{item.items.map((value) => (
				<div key={value}>{value}</div>
			))}
			<AdminActions editUrl={item.editUrl} removeHandler={removeHandler} />
		</div>
	);
};

export default AdminTableItem;
