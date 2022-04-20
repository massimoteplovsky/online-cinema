import { getGenresUrl } from 'config/api.config';
import { useQuery } from 'react-query';

import { GenreService } from '@/services/genre.service';

import { IMenuItem } from '../menu.interface';

export const useGenres = () => {
	let queryData = useQuery(
		'popular-genre-menu',
		() => GenreService.getGenres(),
		{
			select: ({ data }) =>
				data.map(
					(genre) =>
						({
							icon: genre.icon,
							link: getGenresUrl(genre.slug),
							title: genre.name,
						} as IMenuItem)
				),
		}
	);

	return queryData;
};
