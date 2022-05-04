import { FC } from 'react';
import ReduxToastr from 'react-redux-toastr';

const ReaduxToastrLib: FC = () => {
	return (
		<ReduxToastr
			timeOut={4000}
			newestOnTop={false}
			preventDuplicates
			position="top-left"
			transitionIn="fadeIn"
			transitionOut="fadeOut"
			progressBar
			closeOnToastrClick
		/>
	);
};

export default ReaduxToastrLib;
