import s from '../admin.module.scss';

import CountUser from './count-user';
import PopularMovie from './popular-movie';

const Statistics = () => {
	return (
		<div className={s.statistics}>
			<CountUser />
			<PopularMovie />
		</div>
	);
};

export default Statistics;
