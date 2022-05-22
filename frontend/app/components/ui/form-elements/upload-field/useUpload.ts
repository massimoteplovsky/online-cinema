import { ChangeEvent, useCallback, useMemo, useState } from 'react';
import { useMutation } from 'react-query';

import { FileService } from '@/services/file.service';

import { toastrError } from '@/utils/toastr-error';

type TUpload = (
	onChange: (...event: any) => void,
	folder?: string
) => {
	uploadFile: (e: ChangeEvent<HTMLInputElement>) => Promise<void>;
	isLoading: boolean;
};

export const useUpload: TUpload = (onChange, folder) => {
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const { mutateAsync: upload } = useMutation(
		'Upload image',
		(data: FormData) => FileService.upload(data, folder),
		{
			onSuccess: ({ data }) => {
				onChange(data[0].url);
			},
			onError: (error) => {
				toastrError(error, 'Upload file');
			},
		}
	);

	const uploadFile = useCallback(
		async (e: ChangeEvent<HTMLInputElement>) => {
			setIsLoading(true);
			const files = e.target.files;

			if (!files?.length) return;

			const formData = new FormData();
			formData.append('image', files[0]);

			await upload(formData);

			setTimeout(() => {
				setIsLoading(false);
			}, 1000);
		},
		[upload]
	);

	return useMemo(
		() => ({
			uploadFile,
			isLoading,
		}),
		[uploadFile, isLoading]
	);
};
