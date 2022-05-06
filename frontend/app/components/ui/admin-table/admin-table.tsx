import { FC } from 'react';

import SkeletonLoader from '../skeleton-loader';

import AdminTableHeader from './admin-table-header';
import AdminTableItem from './admin-table-item';
import { ITableItem } from './admin-table.interface';
import s from './admin-table.module.scss';

interface IAdminTable {
	tableItems: ITableItem[];
	headerItems: string[];
	isLoading: boolean;
	removeHandler: (userId: string) => void;
}

const AdminTable: FC<IAdminTable> = ({
	tableItems,
	headerItems,
	isLoading,
	removeHandler,
}) => {
	return (
		<div>
			<AdminTableHeader headerItems={headerItems} />
			{isLoading ? (
				<SkeletonLoader count={1} height={48} className="mt-4" />
			) : tableItems.length ? (
				tableItems.map((item) => (
					<AdminTableItem
						key={item._id}
						item={item}
						removeHandler={() => removeHandler(item._id)}
					/>
				))
			) : (
				<div className={s.notFound}>Elements not found</div>
			)}
		</div>
	);
};

export default AdminTable;
