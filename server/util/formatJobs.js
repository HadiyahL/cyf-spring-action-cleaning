import { DateTime } from "luxon";

export const formatJobs = (jobs) =>
	jobs.map((job) => ({
		...job,
		visit_time: formatHours(job.visit_time),
		visit_end: countVisitEnd(job.visit_time, job.duration),
		duration: intToHours(job.duration),
		start_time: formatHours(job.start_time),
		end_time: formatHours(job.end_time),
		actual_duration: countActualDuration(job.start_time, job.end_time),
	}));

export const countActualDuration = (startTime, endTime) => {
	if (!startTime || !endTime) {
		return null;
	}

	const end = DateTime.fromSQL(endTime);
	const start = DateTime.fromSQL(startTime);
	let difference = end.diff(start, ["hours", "minutes"]);

	// unlikely to happen but this accounts for
	// when cleaner worked from one day into another (23: 00 -> 01: 00)
	if (difference.values.minutes < 0) {
		difference = difference.plus({ hours: 23, minutes: 60 });
	} else if (difference.values.hours < 0) {
		difference = difference.plus({ hours: 24 });
	}
	const result = DateTime.fromObject(difference.values).toFormat("HH:mm");

	return result;
};

export const formatHours = (hoursWithSeconds) => {
	if (!hoursWithSeconds) {
		return null;
	}

	return DateTime.fromSQL(hoursWithSeconds).toFormat("HH:mm");
};

export const countVisitEnd = (startTime, duration) => {
	if (!duration) {
		return null;
	}

	return DateTime.fromSQL(startTime)
		.plus({ hours: duration })
		.toFormat("HH:mm");
};

export const intToHours = (numberOfHours) => {
	if (!numberOfHours) {
		return null;
	}

	return `${numberOfHours < 10 ? `0${numberOfHours}` : numberOfHours}:00`;
};
