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

export const getWeekFromDate = (date = new Date()) => {
	const start = DateTime.fromJSDate(date)
		.minus({ days: 7 })
		.startOf("week")
		.toISODate();
	const end = DateTime.fromJSDate(date)
		.minus({ days: 7 })
		.endOf("week")
		.toISODate();

	return {
		start,
		end,
	};
};

export const setCleaningTimeForNextWeek = (jobs) =>
	jobs.map((job) => ({ ...job, visit_on: getDateForNextWeek(job.visit_on) }));

export const getDateForNextWeek = (date) => {
	const nextWeekStartDate = DateTime.local().plus({ weeks: 1 }).startOf("week");
	const originalVisitDate = DateTime.fromISO(date);
	return nextWeekStartDate.plus({ days: originalVisitDate.weekday - 1 });
};

export const plusDayForJob = (jobs, id) =>
	jobs.map((job) => {
		if (job.id === id) {
			job.visit_on = DateTime.fromISO(job.visit_on)
				.plus({ days: 1 })
				.toISODate();
		}
		return job;
	});

export const minusDayForJob = (jobs, id) =>
	jobs.map((job) => {
		if (job.id === id) {
			job.visit_on = DateTime.fromISO(job.visit_on)
				.minus({ days: 1 })
				.toISODate();
		}
		return job;
	});
