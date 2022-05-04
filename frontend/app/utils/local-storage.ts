export const getFromLocalStorage = (name: string) => {
	if (typeof localStorage !== 'undefined') {
		const item = localStorage.getItem(name);
		return item ? JSON.parse(item) : null;
	}

	return null;
};

export const saveToLocalStorage = <T>(name: string, data: T): void => {
	localStorage.setItem(name, JSON.stringify(data));
};

export const removeFromLocalStorage = (name: string): void => {
	localStorage.removeItem(name);
};
