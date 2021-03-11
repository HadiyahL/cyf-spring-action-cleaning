import { DateTime, Duration } from "luxon";

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
		return "Completed";
	}

	const today = DateTime.local().minus({ days: 1 });
	const visitDate = DateTime.fromISO(date);

	if (visitDate < today) {
		return "Missing";
	} else {
		return "Awaiting";
	}
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
	jobs.map((job) => ({
		...job,
		details: job.branch_details,
		visit_on: getDateForNextWeek(job.visit_on),
	}));

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

export const formatDate = (dateISO, options) => {
	const date = new Date(dateISO);

	return date.toLocaleDateString("en-GB", options);
};

export const totalsForAddress = (data) => {
	const reduced = data.reduce(
		(acc, cur) => {
			acc.actual_duration = acc.actual_duration
				.plus(Duration.fromISOTime(cur.actual_duration))
				.normalize();

			acc.contracted_duration = acc.contracted_duration
				.plus(Duration.fromISOTime(cur.contracted_duration))
				.normalize();

			return acc;
		},
		{
			actual_duration: Duration.fromISOTime("00:00"),
			contracted_duration: Duration.fromISOTime("00:00"),
		}
	);

	const difference = reduced.contracted_duration
		.minus(reduced.actual_duration.shiftTo("milliseconds").toObject())
		.shiftTo("hours", "minutes");

	return {
		actual_duration: formatDuration(
			reduced.actual_duration.values.hours,
			reduced.actual_duration.values.minutes
		),
		contracted_duration: formatDuration(
			reduced.contracted_duration.values.hours,
			reduced.contracted_duration.values.minutes
		),
		difference: formatDuration(
			difference.values.hours,
			difference.values.minutes
		),
	};
};

export const formatDuration = (hours = 0, minutes = 0) => {
	const h = Math.abs(hours).toString().padStart(2, "0");
	const m = Math.abs(minutes).toString().padStart(2, "0");

	return `${hours < 0 || minutes < 0 ? "-" : ""}${h}:${m}`;
};

export const totalsForCustomer = (data) => {
	const addressTotals = data.map((branch) => totalsForAddress(branch));
	const customerTotals = totalsForAddress(addressTotals);
	return customerTotals;
};
