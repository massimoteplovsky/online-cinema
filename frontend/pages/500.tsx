import Heading from '@/components/ui/heading/heading';

import Meta from '@/utils/meta/meta';

export default function Error500() {
	return (
		<Meta title="Page not found">
			<Heading title="500 - Server-side error occurred" />
		</Meta>
	);
}
