import { Router } from "express";
import { DateTime } from "luxon";
import db from "../db";
import { formatDuration } from "../util/helpers";
import { checkAuth, checkPermission } from "../middleware";

const router = new Router();

router.get(
	"/reports/worker/:worker_id/:start/:finish",
	checkAuth,
	checkPermission("get:reports/worker"),
	async (req, res, next) => {
		const { worker_id, start, finish } = req.params;

		const client = await db.getClient();

		const labels = [
			"Customer",
			"Address",
			"Planned duration",
			"Actual duration",
		];
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

			const formattedData = rows.map((obj) => {
				return {
					...obj,
					contracted_duration: formatDuration(obj.contracted_duration),
					actual_duration: formatDuration(
						obj.actual_duration.hours,
						obj.actual_duration.minutes
					),
				};
			});

			const contracted_duration = formatDuration(
				totals.rows[0]?.contracted_duration
			);

			const actual_duration = formatDuration(
				totals.rows[0].actual_duration?.hours,
				totals.rows[0].actual_duration?.minutes
			);

			const formattedTotals = {
				contracted_duration,
				actual_duration,
			};

			return res.json({
				rows: formattedData,
				totals: [formattedTotals],
				labels: labels,
			});
		} catch (e) {
			next(e);
		} finally {
			client.release();
		}
	}
);

router.get(
	"/reports/worker_detailed/:worker_id/:start/:finish",
	checkAuth,
	checkPermission("get:reports/worker_detailed"),
	async (req, res, next) => {
		const { worker_id, start, finish } = req.params;

		const client = await db.getClient();

		const labels = [
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

			const formattedData = rows.map((obj) => {
				return {
					...obj,
					contracted_duration: formatDuration(obj.contracted_duration),
					actual_duration: formatDuration(
						obj.actual_duration.hours,
						obj.actual_duration.minutes
					),
				};
			});

			const contracted_duration = formatDuration(
				totals.rows[0]?.contracted_duration
			);

			const actual_duration = formatDuration(
				totals.rows[0].actual_duration?.hours,
				totals.rows[0].actual_duration?.minutes
			);

			const formattedTotals = {
				contracted_duration,
				actual_duration,
			};

			return res.json({
				rows: formattedData,
				totals: [formattedTotals],
				labels: labels,
			});
		} catch (e) {
			next(e);
		} finally {
			client.release();
		}
	}
);

router.get(
	"/general_reports/worker/:start/:finish",
	checkAuth,
	checkPermission("get:general_reports/worker"),
	async (req, res, next) => {
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
				AND j.status = 1
			`,
				[start, finish]
			);

			const formattedData = rows.map((obj) => {
				return {
					...obj,
					contracted_duration: formatDuration(obj.contracted_duration),
					actual_duration: formatDuration(
						obj.actual_duration.hours,
						obj.actual_duration.minutes
					),
				};
			});

			const contracted_duration = formatDuration(
				totals.rows[0]?.contracted_duration
			);

			const actual_duration = formatDuration(
				totals.rows[0].actual_duration?.hours,
				totals.rows[0].actual_duration?.minutes
			);

			const formattedTotals = {
				contracted_duration,
				actual_duration,
			};

			return res.json({
				rows: formattedData,
				totals: [formattedTotals],
			});
		} catch (e) {
			next(e);
		} finally {
			client.release();
		}
	}
);

router.get(
	"/reports/customer/:customer_id/:start/:finish",
	checkAuth,
	checkPermission("get:reports/customer"),
	async (req, res, next) => {
		const { customer_id, start, finish } = req.params;

		const client = await db.getClient();

		const labels = [
			"Address",
			"Cleaner",
			"Planned duration",
			"Actual duration",
		];
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

			const formattedData = rows.map((obj) => {
				return {
					...obj,
					contracted_duration: formatDuration(obj.contracted_duration),
					actual_duration: formatDuration(
						obj.actual_duration.hours,
						obj.actual_duration.minutes
					),
				};
			});

			const contracted_duration = formatDuration(
				totals.rows[0]?.contracted_duration
			);

			const actual_duration = formatDuration(
				totals.rows[0].actual_duration?.hours,
				totals.rows[0].actual_duration?.minutes
			);

			const formattedTotals = {
				contracted_duration,
				actual_duration,
			};

			return res.json({
				rows: formattedData,
				totals: [formattedTotals],
				labels: labels,
			});
		} catch (e) {
			next(e);
		} finally {
			client.release();
		}
	}
);

router.get(
	"/reports/customer_detailed/:customer_id/:start/:finish",
	checkAuth,
	checkPermission("get:reports/customer_detailed"),
	async (req, res, next) => {
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

			const formattedData = rows.map((obj) => {
				return {
					...obj,
					contracted_duration: formatDuration(obj.contracted_duration),
					actual_duration: formatDuration(
						obj.actual_duration.hours,
						obj.actual_duration.minutes
					),
				};
			});

			const contracted_duration = formatDuration(
				totals.rows[0]?.contracted_duration
			);

			const actual_duration = formatDuration(
				totals.rows[0].actual_duration?.hours,
				totals.rows[0].actual_duration?.minutes
			);

			const formattedTotals = {
				contracted_duration,
				actual_duration,
			};

			return res.json({
				rows: formattedData,
				totals: [formattedTotals],
				labels: labels,
			});
		} catch (e) {
			next(e);
		} finally {
			client.release();
		}
	}
);

router.get(
	"/general_reports/customer/:start/:finish",
	checkAuth,
	checkPermission("get:general_reports/customer"),
	async (req, res, next) => {
		const { start, finish } = req.params;

		const client = await db.getClient();

		try {
			const { rows } = await client.query(
				`SELECT c.id, c.name customer, SUM(j.duration) contracted_duration, SUM(j.end_time - j.start_time) actual_duration
			FROM jobs j INNER JOIN customers c ON j.customer_id=c.id
			WHERE j.visit_on BETWEEN $1 AND $2
				AND j.status = 1
			GROUP BY (c.id)
			ORDER BY c.name`,
				[start, finish]
			);

			const totals = await client.query(
				`SELECT SUM(j.duration) contracted_duration, SUM(j.end_time - j.start_time) actual_duration
			FROM jobs j INNER JOIN customers c ON j.customer_id=c.id
			WHERE j.visit_on BETWEEN $1 AND $2
				AND j.status = 1`,
				[start, finish]
			);

			const formattedData = rows.map((obj) => {
				return {
					...obj,
					contracted_duration: formatDuration(obj.contracted_duration),
					actual_duration: formatDuration(
						obj.actual_duration.hours,
						obj.actual_duration.minutes
					),
				};
			});

			const contracted_duration = formatDuration(
				totals.rows[0]?.contracted_duration
			);

			const actual_duration = formatDuration(
				totals.rows[0].actual_duration?.hours,
				totals.rows[0].actual_duration?.minutes
			);

			const formattedTotals = {
				contracted_duration,
				actual_duration,
			};

			return res.json({
				rows: formattedData,
				totals: [formattedTotals],
			});
		} catch (e) {
			next(e);
		} finally {
			client.release();
		}
	}
);

router.get(
	"/general_reports/customer_total/:start/:finish",
	checkAuth,
	checkPermission("get:general_reports/customer_total"),
	(req, res, next) => {
		const { start, finish } = req.params;

		db.query(
			`SELECT SUM(j.duration) duration, SUM(j.end_time - j.start_time) actual_duration
			FROM jobs j INNER JOIN customers c ON j.customer_id=c.id
			WHERE j.visit_on BETWEEN $1 AND $2
				AND j.status = 1`,
			[start, finish]
		)
			.then(({ rows }) => {
				return res.json({ rows });
			})
			.catch((e) => {
				console.error(e);
				next(e);
			});
	}
);

router.get(
	"/reports/branch/:customer_id/:branch_id/:start/:finish",
	checkAuth,
	checkPermission("get:reports/branch"),
	(req, res, next) => {
		const { customer_id, branch_id, start, finish } = req.params;
		const labels = ["Cleaner", "Planned duration", "Actual duration"];
		db.query(
			`SELECT w.name worker, SUM(j.duration) duration, SUM(j.end_time - j.start_time) actual_duration
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
		)
			.then(({ rows }) => {
				return res.json({ rows, labels });
			})
			.catch((e) => {
				console.error(e);
				next(e);
			});
	}
);

router.get(
	"/reports/branch_detailed/:customer_id/:branch_id/:start/:finish",
	checkAuth,
	checkPermission("get:reports/branch_detailed"),
	(req, res, next) => {
		const { customer_id, branch_id, start, finish } = req.params;
		const labels = ["Date", "Cleaner", "Planned duration", "Actual duration"];
		db.query(
			`SELECT j.id, j.visit_on, j.duration, (j.end_time - j.start_time) actual_duration, w.name worker, j.feedback
			FROM jobs j
			INNER JOIN workers w ON j.worker_id=w.id
			INNER JOIN branches b ON j.branch_id=b.id
			INNER JOIN customers c ON j.customer_id=c.id
			WHERE c.id=$1 AND b.id=$2
				AND j.visit_on BETWEEN $3 AND $4
				AND j.status = 1
				ORDER BY j.visit_on`,
			[customer_id, branch_id, start, finish]
		)
			.then(({ rows }) => {
				return res.json({ rows, labels });
			})
			.catch((e) => {
				console.error(e);
				next(e);
			});
	}
);

router.get(
	"/reports/branch_total/:customer_id/:branch_id/:start/:finish",
	checkAuth,
	checkPermission("get:reports/branch_total"),
	(req, res, next) => {
		const { customer_id, branch_id, start, finish } = req.params;

		db.query(
			`SELECT SUM(j.duration) duration, SUM(j.end_time - j.start_time) actual_duration
			FROM jobs j INNER JOIN customers c ON j.customer_id=c.id INNER JOIN branches b ON j.branch_id=b.id
			WHERE c.id=$1 AND b.id=$2
				AND j.visit_on BETWEEN $3 AND $4
				AND j.status = 1
				GROUP BY (c.id)`,
			[customer_id, branch_id, start, finish]
		)
			.then(({ rows }) => {
				return res.json({ rows });
			})
			.catch((e) => {
				console.error(e);
				next(e);
			});
	}
);

router.get(
	"/general_reports/branch/:customer_id/:start/:finish",
	checkAuth,
	checkPermission("get:general_reports/branch"),
	(req, res, next) => {
		const { start, finish, customer_id } = req.params;

		db.query(
			`SELECT b.id, b.address, SUM(j.duration) duration, SUM(j.end_time - j.start_time) actual_duration
			FROM jobs j INNER JOIN branches b ON j.branch_id=b.id INNER JOIN customers c ON j.customer_id=c.id
			WHERE j.visit_on BETWEEN $1 AND $2
				AND j.status = 1 AND c.id=$3
			GROUP BY (b.id)
			ORDER BY b.address`,
			[start, finish, customer_id]
		)
			.then(({ rows }) => {
				return res.json({ rows });
			})
			.catch((e) => {
				console.error(e);
				next(e);
			});
	}
);

router.get(
	"/general_reports/branch_total/:customer_id/:start/:finish",
	checkAuth,
	checkPermission("get:general_reports/branch_total"),
	(req, res, next) => {
		const { start, finish, customer_id } = req.params;

		db.query(
			`SELECT SUM(j.duration) duration, SUM(j.end_time - j.start_time) actual_duration
			FROM jobs j INNER JOIN customers c ON j.customer_id=c.id
			WHERE j.visit_on BETWEEN $1 AND $2
				AND j.status = 1 AND c.id=$3`,
			[start, finish, customer_id]
		)
			.then(({ rows }) => {
				return res.json({ rows });
			})
			.catch((e) => {
				console.error(e);
				next(e);
			});
	}
);

router.get(
	"/general_reports/general/:start/:finish",
	checkAuth,
	checkPermission("get:general_reports/general"),
	async (req, res, next) => {
		const { start, finish } = req.params;

		const client = await db.getClient();

		try {
			const { rows } = await client.query(
				`SELECT c.name customer, b.address branch, j.visit_on, w.name worker, j.duration contracted_duration, (j.end_time - j.start_time) actual_duration, j.feedback, j.id
				FROM jobs j
				INNER JOIN customers c ON j.customer_id=c.id
				INNER JOIN branches b ON j.branch_id=b.id
				INNER JOIN workers w ON j.worker_id=w.id
				WHERE j.visit_on BETWEEN $1 AND $2
					AND j.status = 1
					ORDER BY j.visit_on
					`,
				[start, finish]
			);

			const totals = await client.query(
				`SELECT SUM(j.duration) contracted_duration, SUM(j.end_time - j.start_time) actual_duration
				FROM jobs j
				WHERE j.visit_on
					BETWEEN $1 AND $2
					AND j.status = 1`,
				[start, finish]
			);

			const dataWithTimeDifference = rows.map((obj) => {
				return {
					...obj,
					contracted_duration: formatDuration(obj.contracted_duration),
					actual_duration: formatDuration(
						obj.actual_duration.hours,
						obj.actual_duration.minutes
					),
					difference: DateTime.fromObject({
						hour: obj.contracted_duration,
					})
						.diff(
							DateTime.fromObject({
								hour: obj.actual_duration.hours || 0,
								minute: obj.actual_duration.minutes,
							}),
							["hours", "minutes"]
						)
						.toObject(),
				};
			});

			const contracted_duration = formatDuration(
				totals.rows[0]?.contracted_duration
			);

			const actual_duration = formatDuration(
				totals.rows[0].actual_duration?.hours,
				totals.rows[0].actual_duration?.minutes
			);

			const diffHours = contracted_duration.hours - actual_duration.hours;
			const diffMinutes = contracted_duration.minutes - actual_duration.minutes;
			const difference = formatDuration(diffHours, diffMinutes);

			const formattedTotals = {
				contracted_duration,
				actual_duration,
				difference,
			};

			return res.json({
				generalData: dataWithTimeDifference,
				generalTotals: [formattedTotals],
			});
		} catch (e) {
			next(e);
		} finally {
			client.release();
		}
	}
);

export default router;
