import { FC } from 'react';

import Button from '@/components/ui/form-elements/button';

import s from './admin-create-button.module.scss';

const AdminCreateButton: FC<{ onClick: () => void }> = ({ onClick }) => {
	return <Button onClick={onClick}>Create new</Button>;
};

export default AdminCreateButton;
