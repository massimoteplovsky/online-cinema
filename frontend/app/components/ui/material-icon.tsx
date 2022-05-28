import { FC } from 'react';
import * as MaterialIcons from 'react-icons/md';

import { useRenderClient } from '@/hooks/useRenderClient';

import { TMaterialIcons } from '@/shared/types/icon.types';

const MaterialIcon: FC<{ name: TMaterialIcons }> = ({ name }) => {
	const { isRenderClient } = useRenderClient();
	const IconComponent = MaterialIcons[name];

	return isRenderClient
		? <IconComponent /> || <MaterialIcons.MdDragIndicator />
		: null;
};

export default MaterialIcon;
