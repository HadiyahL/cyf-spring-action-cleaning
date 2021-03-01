import { body, check } from "express-validator";
import { DateTime } from "luxon";
import { checkErrors } from ".";

const addJob = [
	body("customer_id", "Customer id is required").not().isEmpty(),
	body("customer", "Client is required").not().isEmpty(),
	body("branch_id", "Branch id is required").not().isEmpty(),
	body("branch", "Address is required").not().isEmpty(),
	body("worker_id", "Worker id is required").exists(),
	body("worker", "Cleaner is required").not().isEmpty(),
	body("details", "Details are required").exists(),
	body("details", "Max length is 500 characters").isLength({ max: 500 }),
	body("visit_on", "Visit date is required").not().isEmpty(),
	body(
		"visit_time",
		"Start time is not in a format of HH:MM (24h clock)"
	).custom((value) =>
		/^([0-1]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/.test(value)
	),
	body("visit_time", "Visit time is required").not().isEmpty(),
	body("pay_rate", "Pay rate is not in a format of 10.50 or 10").custom(
		(value) => value === "" || /^\d+(\.\d+)?$/.test(value)
	),
	body("pay_rate", "Pay rate is required").exists(),
	body("duration", "Duration is required").exists(),
	body("duration", "Duration should be an integer").isInt(),
	body(
		"start_time",
		"Start time is not in a format of HH:MM (24h clock)"
	).custom(
		(value) =>
			value === "" ||
			/^([0-1]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/.test(value)
	),
	body("end_time", "End time is not in a format of HH:MM (24h clock)").custom(
		(value) =>
			value === "" ||
			/^([0-1]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/.test(value)
	),
	check("start_time", "Start time should be before the end time").custom(
		(value, { req }) =>
			DateTime.fromISO(value) < DateTime.fromISO(req.body.end_time) ||
			(value === "" && req.body.end_time === "")
	),
	checkErrors,
];

const editJob = [
	body("customer_id", "Please provide a customer id").not().isEmpty(),
	body("branch_id", "Please provide a branch id").not().isEmpty(),
	body("worker_id", "Please provide a worker id").not().isEmpty(),
	body("details", "Details is required").exists(),
	body("details", "Max length is 500 characters").isLength({ max: 500 }),
	body("visit_on", "Visit date is required").not().isEmpty(),
	body(
		"visit_time",
		"Start time is not in a format of HH:MM (24h clock)"
	).custom((value) =>
		/^([0-1]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/.test(value)
	),
	body("visit_time", "Visit time is required").not().isEmpty(),
	body("pay_rate", "Pay rate is not in a format of 10.50 or 10").custom(
		(value) => value === "" || /^\d+(\.\d+)?$/.test(value)
	),
	body("pay_rate", "Pay rate is required").exists(),
	body("duration", "Duration is required").exists(),
	body("duration", "Duration should be an integer").isInt(),
	body(
		"start_time",
		"Start time is not in a format of HH:MM (24h clock)"
	).custom(
		(value) =>
			value === "" ||
			/^([0-1]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/.test(value)
	),
	body("end_time", "End time is not in a format of HH:MM (24h clock)").custom(
		(value) =>
			value === "" ||
			/^([0-1]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/.test(value)
	),
	check("start_time", "Start time should be before the end time").custom(
		(value, { req }) =>
			DateTime.fromISO(value) < DateTime.fromISO(req.body.end_time) ||
			(value === "" && req.body.end_time === "")
	),
	checkErrors,
];

const workerLogTime = [
	body(
		"startTime",
		"Start time is not in a format of HH:MM (24h clock)"
	).custom(
		(value) =>
			value === "" ||
			/^([0-1]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/.test(value)
	),
	body("endTime", "End time is not in a format of HH:MM (24h clock)").custom(
		(value) =>
			value === "" ||
			/^([0-1]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/.test(value)
	),
	check("startTime", "End time should be greater than start time").custom(
		(value, { req }) =>
			DateTime.fromISO(value) < DateTime.fromISO(req.body.endTime) ||
			(value === "" && req.body.endTime === "")
	),
	body("feedback", "Max length is 500 characters").isLength({ max: 500 }),
	checkErrors,
];

export default {
	addJob,
	editJob,
	workerLogTime,
};
