import db from "../db";
import {
	formatData,
	groupAddresses,
	groupWorkers,
	countDurationDifference,
} from "../util/helpers";

const getWorkerReport = async (req, res, next) => {
	const { worker_id, start, finish } = req.params;

	const client = await db.getClient();

	const labels = ["Customer", "Address", "Planned duration", "Actual duration"];
	try {
		const { rows } = await client.query(
			`SELECT c.name column_1, b.address column_2, SUM(j.duration) contracted_duration, SUM(j.end_time - j.start_time) actual_duration 
			FROM jobs j
			INNER JOIN workers w ON j.worker_id=w.id
			INNER JOIN branches b ON j.branch_id=b.id
			INNER JOIN customers c ON j.customer_id=c.id
			WHERE w.id=$1
				AND j.visit_on BETWEEN $2 AND $3
				AND j.status = 1
			GROUP BY (b.address, c.name)
			ORDER BY c.name`,
			[worker_id, start, finish]
		);

		const totals = await client.query(
			`SELECT SUM(j.duration) contracted_duration, SUM(j.end_time - j.start_time) actual_duration
			FROM jobs j
			INNER JOIN workers w ON j.worker_id=w.id
			WHERE w.id=$1
				AND j.visit_on BETWEEN $2 AND $3
				AND j.status = 1
			GROUP BY (w.id)`,
			[worker_id, start, finish]
		);

		const formattedData = formatData(rows);

		const formattedTotals = rows.length ? formatData(totals.rows) : [];

		return res.json({
			rows: formattedData,
			totals: formattedTotals,
			labels: labels,
		});
	} catch (e) {
		next(e);
	} finally {
		client.release();
	}
};

const getWorkerReportDetailed = async (req, res, next) => {
	const { worker_id, start, finish } = req.params;

	const client = await db.getClient();

	const labels = [
		"Date",
		"Customer",
		"Address",
		"Planned duration",
		"Actual duration",
	];
	try {
		const { rows } = await client.query(
			`SELECT j.id, j.visit_on, c.name column_1, b.address column_2, j.duration contracted_duration, (j.end_time - j.start_time) actual_duration, w.name worker, j.feedback 
			FROM jobs j
			INNER JOIN workers w ON j.worker_id=w.id
			INNER JOIN branches b ON j.branch_id=b.id
			INNER JOIN customers c ON j.customer_id=c.id
			WHERE w.id=$1
				AND j.visit_on BETWEEN $2 AND $3
				AND j.status = 1
			ORDER BY j.visit_on`,
			[worker_id, start, finish]
		);

		const totals = await client.query(
			`SELECT SUM(j.duration) contracted_duration, SUM(j.end_time - j.start_time) actual_duration
			FROM jobs j
			INNER JOIN workers w ON j.worker_id=w.id
			WHERE w.id=$1
				AND j.visit_on BETWEEN $2 AND $3
				AND j.status = 1
			GROUP BY (w.id)`,
			[worker_id, start, finish]
		);

		const formattedData = formatData(rows, true);

		const formattedTotals = rows.length ? formatData(totals.rows) : [];

		return res.json({
			rows: formattedData,
			totals: formattedTotals,
			labels: labels,
		});
	} catch (e) {
		next(e);
	} finally {
		client.release();
	}
};

const getGeneralWorkersReport = async (req, res, next) => {
	const { start, finish } = req.params;

	const client = await db.getClient();

	try {
		const { rows } = await client.query(
			`SELECT w.id, w.name worker, SUM(j.duration) contracted_duration, SUM(j.end_time - j.start_time) actual_duration
			FROM jobs j
			INNER JOIN workers w ON j.worker_id=w.id
			WHERE j.visit_on BETWEEN $1 AND $2
				AND j.status = 1
			GROUP BY (w.id)
			ORDER BY w.name`,
			[start, finish]
		);

		const totals = await client.query(
			`SELECT SUM(j.duration) contracted_duration, SUM(j.end_time - j.start_time) actual_duration
			FROM jobs j
			INNER JOIN workers w ON j.worker_id=w.id
			WHERE j.visit_on BETWEEN $1 AND $2
				AND j.status = 1`,
			[start, finish]
		);

		const formattedData = formatData(rows);

		const formattedTotals = rows.length ? formatData(totals.rows) : [];

		return res.json({
			rows: formattedData,
			totals: formattedTotals,
		});
	} catch (e) {
		next(e);
	} finally {
		client.release();
	}
};

const getCustomerReport = async (req, res, next) => {
	const { customer_id, start, finish } = req.params;

	const client = await db.getClient();

	const labels = ["Address", "Cleaner", "Planned duration", "Actual duration"];
	try {
		const { rows } = await client.query(
			`SELECT b.address column_1, w.name column_2, SUM(j.duration) contracted_duration, SUM(j.end_time - j.start_time) actual_duration
			FROM jobs j
			INNER JOIN workers w ON j.worker_id=w.id
			INNER JOIN branches b ON j.branch_id=b.id
			INNER JOIN customers c ON j.customer_id=c.id
			WHERE c.id=$1
				AND j.visit_on BETWEEN $2 AND $3
				AND j.status = 1
			GROUP BY (b.address, w.name)
			ORDER BY b.address`,
			[customer_id, start, finish]
		);

		const totals = await client.query(
			`SELECT SUM(j.duration) contracted_duration, SUM(j.end_time - j.start_time) actual_duration
			FROM jobs j INNER JOIN customers c ON j.customer_id=c.id
			WHERE c.id=$1
				AND j.visit_on BETWEEN $2 AND $3
				AND j.status = 1
			GROUP BY (c.id)`,
			[customer_id, start, finish]
		);

		const formattedData = formatData(rows);

		const formattedTotals = rows.length ? formatData(totals.rows) : [];

		return res.json({
			rows: formattedData,
			totals: formattedTotals,
			labels: labels,
		});
	} catch (e) {
		next(e);
	} finally {
		client.release();
	}
};

const getCustomerReportDetailed = async (req, res, next) => {
	const { customer_id, start, finish } = req.params;

	const client = await db.getClient();

	const labels = [
		"Date",
		"Address",
		"Cleaner",
		"Planned duration",
		"Actual duration",
	];
	try {
		const { rows } = await client.query(
			`SELECT j.id, j.visit_on, b.address column_1, w.name column_2, j.duration contracted_duration, (j.end_time - j.start_time) actual_duration, w.name worker, j.feedback
			FROM jobs j
			INNER JOIN workers w ON j.worker_id=w.id
			INNER JOIN branches b ON j.branch_id=b.id
			INNER JOIN customers c ON j.customer_id=c.id
			WHERE c.id=$1
				AND j.visit_on BETWEEN $2 AND $3
				AND j.status = 1
			ORDER BY j.visit_on`,
			[customer_id, start, finish]
		);

		const totals = await client.query(
			`SELECT SUM(j.duration) contracted_duration, SUM(j.end_time - j.start_time) actual_duration
			FROM jobs j INNER JOIN customers c ON j.customer_id=c.id
			WHERE c.id=$1
				AND j.visit_on BETWEEN $2 AND $3
				AND j.status = 1
			GROUP BY (c.id)`,
			[customer_id, start, finish]
		);

		const formattedData = formatData(rows, true);

		const formattedTotals = rows.length ? formatData(totals.rows) : [];

		return res.json({
			rows: formattedData,
			totals: formattedTotals,
			labels: labels,
		});
	} catch (e) {
		next(e);
	} finally {
		client.release();
	}
};

const getGeneralCustomersReport = async (req, res, next) => {
	const { start, finish } = req.params;

	const client = await db.getClient();

	try {
		const { rows } = await client.query(
			`SELECT c.id, c.name customer, SUM(j.duration) contracted_duration, SUM(j.end_time - j.start_time) actual_duration
			FROM jobs j
			INNER JOIN customers c ON j.customer_id=c.id
			WHERE j.visit_on BETWEEN $1 AND $2
				AND j.status = 1
			GROUP BY (c.id)
			ORDER BY c.name`,
			[start, finish]
		);

		const totals = await client.query(
			`SELECT SUM(j.duration) contracted_duration, SUM(j.end_time - j.start_time) actual_duration
			FROM jobs j
			INNER JOIN customers c ON j.customer_id=c.id
			WHERE j.visit_on BETWEEN $1 AND $2
				AND j.status = 1`,
			[start, finish]
		);

		const formattedData = formatData(rows);

		const formattedTotals = rows.length ? formatData(totals.rows) : [];

		return res.json({
			rows: formattedData,
			totals: formattedTotals,
		});
	} catch (e) {
		next(e);
	} finally {
		client.release();
	}
};

const getBranchReport = async (req, res, next) => {
	const { customer_id, branch_id, start, finish } = req.params;

	const client = await db.getClient();

	const labels = ["Cleaner", "Planned duration", "Actual duration"];
	try {
		const { rows } = await client.query(
			`SELECT w.name worker, SUM(j.duration) contracted_duration, SUM(j.end_time - j.start_time) actual_duration
			FROM jobs j
			INNER JOIN workers w ON j.worker_id=w.id
			INNER JOIN branches b ON j.branch_id=b.id
			INNER JOIN customers c ON j.customer_id=c.id
			WHERE c.id=$1 AND b.id=$2
				AND j.visit_on BETWEEN $3 AND $4
				AND j.status = 1
			GROUP BY (w.name)
			ORDER BY w.name`,
			[customer_id, branch_id, start, finish]
		);

		const totals = await client.query(
			`SELECT SUM(j.duration) contracted_duration, SUM(j.end_time - j.start_time) actual_duration
			FROM jobs j
			INNER JOIN customers c ON j.customer_id=c.id
			INNER JOIN branches b ON j.branch_id=b.id
			WHERE c.id=$1 AND b.id=$2
				AND j.visit_on BETWEEN $3 AND $4
				AND j.status = 1
			GROUP BY (c.id)`,
			[customer_id, branch_id, start, finish]
		);

		const formattedData = formatData(rows);

		const formattedTotals = rows.length ? formatData(totals.rows) : [];

		return res.json({
			rows: formattedData,
			totals: formattedTotals,
			labels: labels,
		});
	} catch (e) {
		next(e);
	} finally {
		client.release();
	}
};

const getBranchReportDetailed = async (req, res, next) => {
	const { customer_id, branch_id, start, finish } = req.params;

	const client = await db.getClient();

	const labels = ["Date", "Cleaner", "Planned duration", "Actual duration"];
	try {
		const { rows } = await client.query(
			`SELECT j.id, j.visit_on, j.duration contracted_duration, (j.end_time - j.start_time) actual_duration, w.name worker, j.feedback
			FROM jobs j
			INNER JOIN workers w ON j.worker_id=w.id
			INNER JOIN branches b ON j.branch_id=b.id
			INNER JOIN customers c ON j.customer_id=c.id
			WHERE c.id=$1
				AND b.id=$2
				AND j.visit_on BETWEEN $3 AND $4
				AND j.status = 1
			ORDER BY j.visit_on`,
			[customer_id, branch_id, start, finish]
		);

		const totals = await client.query(
			`SELECT SUM(j.duration) contracted_duration, SUM(j.end_time - j.start_time) actual_duration
			FROM jobs j
			INNER JOIN customers c ON j.customer_id=c.id
			INNER JOIN branches b ON j.branch_id=b.id
			WHERE c.id=$1
				AND b.id=$2
				AND j.visit_on BETWEEN $3 AND $4
				AND j.status = 1
			GROUP BY (c.id)`,
			[customer_id, branch_id, start, finish]
		);

		const formattedData = formatData(rows, true);

		const formattedTotals = rows.length ? formatData(totals.rows) : [];

		return res.json({
			rows: formattedData,
			totals: formattedTotals,
			labels: labels,
		});
	} catch (e) {
		next(e);
	} finally {
		client.release();
	}
};

const getGeneralBranchesReport = async (req, res, next) => {
	const { start, finish, customer_id } = req.params;

	const client = await db.getClient();

	try {
		const { rows } = await client.query(
			`SELECT b.id, b.address, SUM(j.duration) contracted_duration, SUM(j.end_time - j.start_time) actual_duration
			FROM jobs j
			INNER JOIN branches b ON j.branch_id=b.id
			INNER JOIN customers c ON j.customer_id=c.id
			WHERE j.visit_on BETWEEN $1 AND $2
				AND j.status = 1
				AND c.id=$3
			GROUP BY (b.id)
			ORDER BY b.address`,
			[start, finish, customer_id]
		);

		const totals = await client.query(
			`SELECT SUM(j.duration) contracted_duration, SUM(j.end_time - j.start_time) actual_duration
			FROM jobs j
			INNER JOIN customers c ON j.customer_id=c.id
			WHERE j.visit_on BETWEEN $1 AND $2
				AND j.status = 1
				AND c.id=$3`,
			[start, finish, customer_id]
		);

		const formattedData = formatData(rows);

		const formattedTotals = rows.length ? formatData(totals.rows) : [];

		return res.json({
			rows: formattedData,
			totals: formattedTotals,
		});
	} catch (e) {
		next(e);
	} finally {
		client.release();
	}
};

const getGeneralReport = async (req, res, next) => {
	const { start, finish } = req.params;

	const client = await db.getClient();

	try {
		const { rows } = await client.query(
			`SELECT c.name customer, b.address branch, j.visit_on, w.name worker, j.duration contracted_duration, (j.end_time - j.start_time) actual_duration, j.feedback, j.id, j.comment
			FROM jobs j
			INNER JOIN customers c ON j.customer_id=c.id
			INNER JOIN branches b ON j.branch_id=b.id
			INNER JOIN workers w ON j.worker_id=w.id
			WHERE j.visit_on BETWEEN $1 AND $2
				AND j.status = 1
			ORDER BY j.visit_on`,
			[start, finish]
		);

		const totals = await client.query(
			`SELECT SUM(j.duration) contracted_duration, SUM(j.end_time - j.start_time) actual_duration
			FROM jobs j
			WHERE j.visit_on BETWEEN $1 AND $2
				AND j.status = 1`,
			[start, finish]
		);

		const formattedData = formatData(rows, true, true);

		const formattedTotals = rows.length
			? formatData(totals.rows, false, true)
			: [];

		if (rows.length) {
			const [{ contracted_duration, actual_duration }] = formattedTotals;

			formattedTotals[0].difference = countDurationDifference(
				actual_duration,
				contracted_duration
			);
		}

		return res.json({
			generalData: formattedData,
			groupedAddresses: groupAddresses(formattedData),
			groupedWorkers: groupWorkers(formattedData),
			generalTotals: formattedTotals,
		});
	} catch (e) {
		next(e);
	} finally {
		client.release();
	}
};

export default {
	getWorkerReport,
	getWorkerReportDetailed,
	getGeneralWorkersReport,
	getCustomerReport,
	getCustomerReportDetailed,
	getGeneralCustomersReport,
	getBranchReport,
	getBranchReportDetailed,
	getGeneralBranchesReport,
	getGeneralReport,
};
