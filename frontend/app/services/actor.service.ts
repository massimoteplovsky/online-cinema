import axios, { axiosClassic } from 'api/interceptors';

import { IActorEdit } from '@/components/screens/admin/edit/actors/actor-edit.interface';

import { IActor } from '@/shared/types/movie.types';

import { getActorsUrl } from '@/configs/api.config';

export const ActorService = {
	async getActors(searchTerm?: string) {
		return await axiosClassic.get<IActor[]>(getActorsUrl(''), {
			params: searchTerm ? { searchTerm } : {},
		});
	},
	async getActorById(genreId: string) {
		return await axios.get<IActorEdit>(getActorsUrl(genreId));
	},
	async getActorBySlug(slug: string) {
		return await axiosClassic.get<IActor>(getActorsUrl(`by-slug/${slug}`));
	},
	async createActor(actorData: IActorEdit) {
		return await axios.post<string>(getActorsUrl(''), actorData);
	},
	async updateActor(actorId: string, actorData: IActorEdit) {
		return await axios.put<IActor>(getActorsUrl(actorId), actorData);
	},
	async deleteActor(actorId: string) {
		return await axios.delete<string>(getActorsUrl(actorId));
	},
};
