import { FC } from 'react';

interface IHeading {
	title: string;
}

const SubHeading: FC<IHeading> = ({ title }) => {
	return <h1 className="text-white text-xl mb-5 font-semibold">{title}</h1>;
};

export default SubHeading;
