import React from 'react';

const FavoriteMovies = () => {
	const isAuth = false;

	if (!isAuth) {
		return (
			<div className="mt-11 bg-gray-700 bg-opacity-20 py-3 px-5 rounded-lg text-white text-opacity-80">
				For viewing favorites plz autorize!
			</div>
		);
	}
	return <div>FavoriteMovies</div>;
};

export default FavoriteMovies;
