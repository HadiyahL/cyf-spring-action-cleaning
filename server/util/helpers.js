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

	const addressesWithoutKeys = map(groupedAddresses, function (item) {
		return values(item);
	});

	// because values() doesn't guarantee the order of object properties, we need to sort it by date
	const sortedByDate = addressesWithoutKeys.map((customer) =>
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

export const dataWithoutKeys = (data) =>
	map(data, function (item) {
		return values(item)[0];
	});

export const groupWorkers = (data) =>
	groupBy(data, function (item) {
		return item.worker;
	});

export const groupByAddress = (customerData) =>
	groupBy(customerData, function (el) {
		return el.branch;
	});

export const totalsForInvoice = (customerData) => {
	const groupedByAddress = groupByAddress(customerData);

	return Object.entries(groupedByAddress).map(([key, value]) => ({
		[key]: totalsForAddress(value),
	}));
};

export const countDurationDifference = (ISOTime1, ISOTime2) => {
	const duration1 = Duration.fromISOTime(ISOTime1);
	const duration2 = Duration.fromISOTime(ISOTime2);

	const difference = duration2
		.minus(duration1.shiftTo("milliseconds").toObject())
		.shiftTo("hours", "minutes");

	return formatDuration(difference.values.hours, difference.values.minutes);
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
			acc.amount += hoursToInt(cur.contracted_duration) * cur.unit_price;

			return acc;
		},
		{
			actual_duration: Duration.fromISOTime("00:00"),
			contracted_duration: Duration.fromISOTime("00:00"),
			amount: 0,
		}
	);

	const difference = reduced.contracted_duration
		.minus(reduced.actual_duration.shiftTo("milliseconds").toObject())
		.shiftTo("hours", "minutes");

	const contracted_duration = formatDuration(
		reduced.contracted_duration.values.hours,
		reduced.contracted_duration.values.minutes
	);

	return {
		actual_duration: formatDuration(
			reduced.actual_duration.values.hours,
			reduced.actual_duration.values.minutes
		),
		contracted_duration,
		quantity: hoursToInt(contracted_duration),
		difference: formatDuration(
			difference.values.hours,
			difference.values.minutes
		),
		amount: reduced.amount,
	};
};

export const hoursToInt = (hours) => {
	// hours always in the format of HH:mm
	return Number(hours.split(":")[0]);
};

export const customerInvoiceTotals = (data) => {
	const addressesWithoutKeys = dataWithoutKeys(data);
	const reduced = addressesWithoutKeys.reduce(
		(acc, cur) => {
			acc.actual_duration = acc.actual_duration
				.plus(Duration.fromISOTime(cur.actual_duration))
				.normalize();
			acc.contracted_duration = acc.contracted_duration
				.plus(Duration.fromISOTime(cur.contracted_duration))
				.normalize();
			acc.amount += cur.amount;
			acc.quantity += cur.quantity;

			return acc;
		},
		{
			amount: 0,
			quantity: 0,
			contracted_duration: Duration.fromISOTime("00:00"),
			actual_duration: Duration.fromISOTime("00:00"),
		}
	);

	const difference = reduced.contracted_duration
		.minus(reduced.actual_duration.shiftTo("milliseconds").toObject())
		.shiftTo("hours", "minutes");

	const contracted_duration = formatDuration(
		reduced.contracted_duration.values.hours,
		reduced.contracted_duration.values.minutes
	);

	return {
		actual_duration: formatDuration(
			reduced.actual_duration.values.hours,
			reduced.actual_duration.values.minutes
		),
		contracted_duration,
		quantity: reduced.quantity,
		difference: formatDuration(
			difference.values.hours,
			difference.values.minutes
		),
		amount: reduced.amount,
	};
};
