import { DateTime } from "luxon";

export const formatDuration = (hours = 0, minutes = 0) => {
	const h = Math.abs(hours).toString().padStart(2, "0");
	const m = Math.abs(minutes).toString().padStart(2, "0");

	return `${hours < 0 || minutes < 0 ? "-" : " "}${h}:${m}`;
};

const formatDifference = ({ hours = 0, minutes = 0 }) => {
	const h = Math.abs(hours).toString().padStart(2, "0");
	const m = Math.abs(minutes).toString().padStart(2, "0");

	return `${hours < 0 || minutes < 0 ? "-" : " "}${h}:${m}`;
};

const countDifference = (obj) => {
	return DateTime.fromObject({
		hour: obj.contracted_duration,
	})
		.diff(
			DateTime.fromObject({
				hour: obj.actual_duration.hours || 0,
				minute: obj.actual_duration.minutes || 0,
			}),
			["hours", "minutes"]
		)
		.toObject();
};

const formatDate = (dateISO, options) => {
	const date = new Date(dateISO);

	return date.toLocaleDateString("en-GB", options);
};

export const formatData = (arr, formatD = false, dif = false) => {
	return arr.map((obj) => {
		if (formatD) {
			if (dif) {
				return {
					...obj,
					visit_on: formatDate(obj.visit_on, {
						year: "numeric",
						month: "numeric",
						day: "numeric",
					}),
					contracted_duration: formatDuration(obj.contracted_duration),
					actual_duration: formatDuration(
						obj.actual_duration.hours,
						obj.actual_duration.minutes
					),
					difference: formatDifference(countDifference(obj)),
				};
			} else {
				return {
					...obj,
					visit_on: formatDate(obj.visit_on, {
						year: "numeric",
						month: "numeric",
						day: "numeric",
					}),
					contracted_duration: formatDuration(obj.contracted_duration),
					actual_duration: formatDuration(
						obj.actual_duration.hours,
						obj.actual_duration.minutes
					),
				};
			}
		} else {
			if (dif) {
				return {
					...obj,
					contracted_duration: formatDuration(obj.contracted_duration),
					actual_duration: formatDuration(
						obj.actual_duration.hours,
						obj.actual_duration.minutes
					),
					difference: formatDifference(countDifference(obj)),
				};
			} else {
				return {
					...obj,
					contracted_duration: formatDuration(obj.contracted_duration),
					actual_duration: formatDuration(
						obj.actual_duration.hours,
						obj.actual_duration.minutes
					),
				};
			}
		}
	});
};
