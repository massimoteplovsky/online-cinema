import { useRouter } from 'next/router';
import { SubmitHandler, UseFormSetValue } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import { toastr } from 'react-redux-toastr';

import { ActorService } from '@/services/actor.service';

import { toastrError } from '@/utils/toastr-error';

import { getAdminPath } from '@/configs/url.config';

import { IActorEdit } from './actor-edit.interface';

export const getKeys = <T>(obj: T) => Object.keys(obj) as Array<keyof T>;

export const useActorEdit = (setValue: UseFormSetValue<IActorEdit>) => {
	const { push, query } = useRouter();
	const actorId = String(query.id);

	const { isLoading } = useQuery(
		['Get actor to edit', actorId],
		() => ActorService.getActorById(actorId),
		{
			onSuccess({ data }) {
				getKeys(data).forEach((key) => {
					setValue(key, data[key]);
				});
			},
			onError(error) {
				toastrError(error, 'Get actor');
			},
			enabled: !!query.id,
		}
	);

	const { mutateAsync: updateActor } = useMutation(
		'Update actor',
		(actorData: IActorEdit) => ActorService.updateActor(actorId, actorData),
		{
			onError: (error) => {
				toastrError(error, 'Update actor error');
			},
			onSuccess: () => {
				toastr.success('Update actor', 'updated successfully');
				push(getAdminPath('/actors'));
			},
		}
	);

	const onSubmit: SubmitHandler<IActorEdit> = (genreData) => {
		updateActor(genreData);
	};

	return {
		isLoading,
		onSubmit,
	};
};
