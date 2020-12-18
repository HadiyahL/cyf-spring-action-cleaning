// sort array of objects for specified field
export const sortDescByABC = (array, field) => {
	return array.sort((first, second) => {
		if (first[field].toLowerCase() > second[field].toLowerCase()) {
			return 1;
		} else {
			return -1;
		}
	});
};
