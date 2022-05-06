import axios, { axiosClassic } from 'api/interceptors';

import { IActor } from '@/shared/types/movie.types';

import { getActorsUrl } from '@/configs/api.config';

export const ActorService = {
	async getActors(searchTerm?: string) {
		return await axiosClassic.get<IActor[]>(getActorsUrl(''), {
			params: searchTerm ? { searchTerm } : {},
		});
	},
	async deleteActor(actorId: string) {
		return await axios.delete<string>(getActorsUrl(actorId));
	},
};
