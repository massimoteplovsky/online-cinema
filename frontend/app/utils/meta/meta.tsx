import Head from 'next/head';
import { useRouter } from 'next/router';
import { FC, ReactNode } from 'react';

import logoImage from '@/assets/images/logo.svg';

import { makeTitle, sitename } from '@/configs/seo.config';

import { onlyText } from '../helpers';

import { ISeo } from './meta.interface';

interface IComponentProps extends ISeo {
	children: ReactNode;
}

const Meta: FC<IComponentProps> = ({ title, description, image, children }) => {
	const { asPath } = useRouter();
	const currentUrl = `${process.env.APP_URL}${asPath}`;

	return (
		<>
			<Head>
				<title itemProp="headline">{makeTitle(title)}</title>
				{description ? (
					<>
						<meta
							itemProp="description"
							name="description"
							content={onlyText(description, 152)}
						/>
						<link rel="canonical" href={currentUrl} />
						<meta property="og:locale" content="en" />
						<meta property="og:title" content={makeTitle(title)} />
						<meta property="og:url" content={currentUrl} />
						<meta property="og:image" content={image || logoImage} />
						<meta property="og:site_name" content={sitename} />
						<meta
							property="og:description"
							content={onlyText(description, 197)}
						/>
					</>
				) : (
					<meta name="robots" content="noindex, nofollow" />
				)}
			</Head>
			{children}
		</>
	);
};

export default Meta;
