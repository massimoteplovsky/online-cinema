import axios from 'api/interceptors';

interface IFile {
	url: string;
	name: string;
}

export const FileService = {
	async upload(file: FormData, folder?: string) {
		return await axios.post<IFile[]>('/files', file, {
			params: { folder },
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});
	},
};
