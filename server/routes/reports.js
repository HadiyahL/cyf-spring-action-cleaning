import { Router } from "express";
import db from "../db";
import { checkAuth, checkPermission } from "../middleware";

const router = new Router();

router.get("/reports/customer/:id", (req, res, next) => {
	const { id } = req.params;
	const { start_date, finish_date } = req.body;
	db.query(
		`SELECT w.name, SUM((j.end_time-j.start_time) * j.pay_rate) pay, SUM(j.end_time - j.start_time) duration
		FROM jobs j
		INNER JOIN branches b ON j.branch_id=b.id
		INNER JOIN workers w ON j.worker_id=w.id
		WHERE j.customer_id=$1
			AND j.visit_on BETWEEN $2 AND $3
			AND j.status = 1
		GROUP BY w.name`,
		[id, start_date, finish_date]
	)
		.then(({ rows }) => {
			return res.json({ rows });
		})
		.catch((e) => {
			console.error(e);
			next(e);
		});
});

router.get(
	"/reports/worker/:worker_id/:start/:finish",
	checkAuth,
	checkPermission("get:reports/worker"),
	(req, res, next) => {
		const { worker_id, start, finish } = req.params;
		const labels = ["Customer", "Address", "Duration"];
		db.query(
			`SELECT c.name column_1, b.address column_2, SUM(j.end_time - j.start_time) duration 
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
	"/reports/worker_detailed/:worker_id/:start/:finish",
	checkAuth,
	checkPermission("get:reports/worker_detailed"),
	(req, res, next) => {
		const { worker_id, start, finish } = req.params;
		const labels = ["Date", "Customer", "Address", "Duration"];
		db.query(
			`SELECT j.id, j.visit_on, c.name column_1, b.address column_2, (j.end_time - j.start_time) duration, w.name worker, j.feedback 
			FROM jobs j
			INNER JOIN workers w ON j.worker_id=w.id
			INNER JOIN branches b ON j.branch_id=b.id
			INNER JOIN customers c ON j.customer_id=c.id
			WHERE w.id=$1
				AND j.visit_on BETWEEN $2 AND $3
				AND j.status = 1
			ORDER BY j.visit_on`,
			[worker_id, start, finish]
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
	"/reports/worker_total/:worker_id/:start/:finish",
	checkAuth,
	checkPermission("get:reports/worker_total"),
	(req, res, next) => {
		const { worker_id, start, finish } = req.params;

		db.query(
			`SELECT w.id, SUM(j.end_time - j.start_time) duration
			FROM jobs j
			INNER JOIN workers w ON j.worker_id=w.id
			WHERE w.id=$1
				AND j.visit_on BETWEEN $2 AND $3
				AND j.status = 1
			GROUP BY (w.id)`,
			[worker_id, start, finish]
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
	"/reports/customer/:customer_id/:start/:finish",
	checkAuth,
	checkPermission("get:reports/customer"),
	(req, res, next) => {
		const { customer_id, start, finish } = req.params;
		const labels = ["Address", "Cleaner", "Duration"];
		db.query(
			`SELECT b.address column_1, w.name column_2, SUM(j.end_time - j.start_time) duration
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
	"/reports/customer_detailed/:customer_id/:start/:finish",
	checkAuth,
	checkPermission("get:reports/customer_detailed"),
	(req, res, next) => {
		const { customer_id, start, finish } = req.params;
		const labels = ["Date", "Address", "Cleaner", "Duration"];
		db.query(
			`SELECT j.id, j.visit_on, b.address column_1, w.name column_2, (j.end_time - j.start_time) duration, w.name worker, j.feedback
			FROM jobs j
			INNER JOIN workers w ON j.worker_id=w.id
			INNER JOIN branches b ON j.branch_id=b.id
			INNER JOIN customers c ON j.customer_id=c.id
			WHERE c.id=$1
				AND j.visit_on BETWEEN $2 AND $3
				AND j.status = 1
				ORDER BY j.visit_on`,
			[customer_id, start, finish]
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
	"/reports/customer_total/:customer_id/:start/:finish",
	checkAuth,
	checkPermission("get:reports/customer_total"),
	(req, res, next) => {
		const { customer_id, start, finish } = req.params;

		db.query(
			`SELECT SUM(j.end_time - j.start_time) duration
			FROM jobs j INNER JOIN customers c ON j.customer_id=c.id
			WHERE c.id=$1
				AND j.visit_on BETWEEN $2 AND $3
				AND j.status = 1
			GROUP BY (c.id)`,
			[customer_id, start, finish]
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

export default router;
