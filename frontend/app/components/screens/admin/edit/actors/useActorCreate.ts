import { useRouter } from 'next/router';
import { SubmitHandler, UseFormSetValue } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import { toastr } from 'react-redux-toastr';

import { ActorService } from '@/services/actor.service';

import { toastrError } from '@/utils/toastr-error';

import { getAdminPath } from '@/configs/url.config';

import { IActorEdit } from './actor-edit.interface';

export const useActorCreate = () => {
	const { push } = useRouter();

	const { mutateAsync: createActor } = useMutation(
		'Create actor',
		(actorData: IActorEdit) => ActorService.createActor(actorData),
		{
			onError: (error) => {
				toastrError(error, 'Actor create error');
			},
			onSuccess: () => {
				toastr.success('Actor genre', 'created successfully');
				push(getAdminPath('/actors'));
			},
		}
	);

	const onSubmit: SubmitHandler<IActorEdit> = (actorData) => {
		createActor(actorData);
	};

	return {
		onSubmit,
	};
};
