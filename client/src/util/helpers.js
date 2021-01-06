import { DateTime } from "luxon";

// sort array of objects for specified field
export const sortAscByABC = (array, field) => {
	return array.sort((first, second) => {
		if (first[field].toLowerCase() > second[field].toLowerCase()) {
			return 1;
		} else {
			return -1;
		}
	});
};

// sort array of objects by specified field and order
export const sortByField = (array, field, isAscending) => {
	return array.sort((res1, res2) => {
		if (typeof res1[field] === "string") {
			// string sort
			return isAscending
				? res1[field]?.localeCompare(res2[field])
				: res2[field]?.localeCompare(res1[field]);
		} else {
			// number sort
			return isAscending
				? res1[field] - res2[field]
				: res2[field] - res1[field];
		}
	});
};

export const determineJobStatus = (status, date) => {
	if (status === 1) {
		return "completed";
	}

	const today = DateTime.local().minus({ days: 1 });
	const visitDate = DateTime.fromISO(date);

	if (visitDate < today) {
		return "missed";
	} else {
		return "awaiting";
	}
};
