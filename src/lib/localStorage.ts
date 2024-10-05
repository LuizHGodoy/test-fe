export const zustandLocalStorage = {
	getItem: (name: string) => {
		const item = localStorage.getItem(name);
		if (item) {
			return JSON.parse(item);
		}
		return null;
	},
	setItem: (name: string, value: unknown) => {
		localStorage.setItem(name, JSON.stringify(value));
	},
	removeItem: (name: string) => {
		localStorage.removeItem(name);
	},
};
