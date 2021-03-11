import { DateTime, Duration } from "luxon";
import { groupBy, values, map } from "lodash";

export const formatDuration = (hours = 0, minutes = 0) => {
	const h = Math.abs(hours).toString().padStart(2, "0");
	const m = Math.abs(minutes).toString().padStart(2, "0");

	return `${hours < 0 || minutes < 0 ? "-" : ""}${h}:${m}`;
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
		if (dif) {
			const diff = countDifference(obj);
			if (formatD) {
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
					difference: formatDuration(diff.hours, diff.minutes),
				};
			} else {
				return {
					...obj,
					contracted_duration: formatDuration(obj.contracted_duration),
					actual_duration: formatDuration(
						obj.actual_duration.hours,
						obj.actual_duration.minutes
					),
					difference: formatDuration(diff.hours, diff.minutes),
				};
			}
		} else {
			if (formatD) {
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

export const groupAddresses = (data) => {
	const groupedCustomers = groupBy(data, function (item) {
		return item.customer;
	});

	const groupedAddresses = map(groupedCustomers, function (item) {
		return groupBy(item, function (el) {
			return el.branch;
		});
	});

	const dataWithoutKeys = map(groupedAddresses, function (item) {
		return values(item);
	});

	// because values() doesn't guarantee the order of object properties, we need to sort it by date
	const sortedByDate = dataWithoutKeys.map((customer) =>
		customer.map((branch) =>
			branch.sort(function (branch1, branch2) {
				if (
					DateTime.fromFormat(branch1.visit_on, "dd/MM/yyyy").toMillis() >
					DateTime.fromFormat(branch2.visit_on, "dd/MM/yyyy").toMillis()
				) {
					return 1;
				} else {
					return -1;
				}
			})
		)
	);

	return sortedByDate;
};

export const groupWorkers = (data) =>
	groupBy(data, function (item) {
		return item.worker;
	});

export const countDurationDifference = (ISOTime1, ISOTime2) => {
	const duration1 = Duration.fromISOTime(ISOTime1);
	const duration2 = Duration.fromISOTime(ISOTime2);

	const difference = duration2
		.minus(duration1.shiftTo("milliseconds").toObject())
		.shiftTo("hours", "minutes");

	return formatDuration(difference.values.hours, difference.values.minutes);
};
