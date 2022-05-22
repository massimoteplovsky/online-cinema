import cn from 'classnames';
import Image from 'next/image';
import { FC } from 'react';

import SkeletonLoader from '../../skeleton-loader';
import s from '../form-elements.module.scss';
import { IUploadField } from '../form.interface';

import { useUpload } from './useUpload';

const UploadField: FC<IUploadField> = ({
	error,
	isNoImage = false,
	placeholder,
	folder,
	value,
	style,
	onChange,
}) => {
	const { isLoading, uploadFile } = useUpload(onChange, folder);
	return (
		<div className={cn(s.field, s.uploadField)} style={style}>
			<div className={s.uploadFlex}>
				<label>
					<span>{placeholder}</span>
					<input type="file" onChange={uploadFile} />
					{error && <div className={s.error}>{error.message}</div>}
				</label>
				{!isNoImage && (
					<div className={s.uploadImageContainer}>
						{isLoading ? (
							<SkeletonLoader count={1} className="w-full h-full" />
						) : (
							value && <Image src={value} alt="" layout="fill" unoptimized />
						)}
					</div>
				)}
			</div>
		</div>
	);
};

export default UploadField;
