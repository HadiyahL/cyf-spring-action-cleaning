import { Router } from "express";
import { body, check, validationResult } from "express-validator";
import db from "../db";

const router = new Router();

router.get("/jobs", (_, res, next) => {
	db.query(
		`SELECT j.id, j.status, j.date_created,b.address, j.visit_on, j.visit_time, j.pay_rate, j.details, j.start_time, j.end_time, c.name customer, w.name worker
		FROM jobs j 
		INNER JOIN branches b ON j.branch_id=b.id 
		INNER JOIN customers c ON j.customer_id=c.id
		INNER JOIN workers w ON w.id=j.worker_id`
	)
		.then(({ rows }) => {
			return res.json({ jobs: rows });
		})
		.catch((e) => {
			console.error(e);
			next(e);
		});
});

router.get("/jobs/customers/:id", async (req, res, next) => {
	const { id } = req.params;
	const client = await db.getClient();

	try {
		// customer has main branch and default worker
		const fullJobDetails = await client.query(
			`SELECT c.name customer_name, b.address, b.visit_time, b.duration, b.id branch_id, w.name worker_name, w.id worker_id
			FROM customers c
			INNER JOIN branches b ON c.id=b.customer_id
			INNER JOIN workers w ON w.id=b.worker_id
			WHERE c.id=$1 AND b.id=c.main_branch_id`,
			[id]
		);
		if (fullJobDetails.rows < 1) {
			// customer has main branch but no default worker
			const jobDetailsBranch = await client.query(
				`
				SELECT c.name customer_name, b.address, b.visit_time, b.duration, b.id branch_id
				FROM customers c
				INNER JOIN branches b ON c.id=b.customer_id
				WHERE c.id=$1 AND b.id=c.main_branch_id
			`,
				[id]
			);

			if (jobDetailsBranch.rows < 1) {
				// customer doesn't have main branch
				const jobDetailsNoBranch = await client.query(
					`
					SELECT c.name customer_name
					FROM customers c
					WHERE c.id=$1
					`,
					[id]
				);
				return res.json({ rows: jobDetailsNoBranch.rows });
			} else {
				return res.json({ rows: jobDetailsBranch.rows });
			}
		} else {
			return res.json({ rows: fullJobDetails.rows });
		}
	} catch (e) {
		next(e);
	} finally {
		client.release();
	}
});

router.post(
	"/jobs",
	[
		body("customer_id", "Customer id is required").not().isEmpty(),
		body("branch_id", "Branch id is required").not().isEmpty(),
		body("worker_id", "Worker id is required (or set as null)").exists(),
		body("details", "Details is required").not().isEmpty(),
		body("visit_on", "Visit date is required").not().isEmpty(),
		body("visit_time", "Visit time is required").not().isEmpty(),
		body("pay_rate", "Pay rate is required").not().isEmpty(),
	],
	(req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(200).json({ success: false, errors: errors.array() });
		}

		const {
			customer_id,
			branch_id,
			worker_id,
			details,
			visit_on,
			visit_time,
			pay_rate,
		} = req.body;

		const date = new Date();

		db.query(
			`INSERT INTO jobs (customer_id, branch_id, worker_id, details, visit_on, visit_time, pay_rate, date_created)
			VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
			[
				customer_id,
				branch_id,
				worker_id,
				details,
				visit_on,
				visit_time,
				pay_rate,
				date,
			]
		)
			.then(({ rowCount }) => {
				if (rowCount < 1) {
					return res
						.status(400)
						.json({ success: false, message: "Job not added." });
				} else {
					return res.json({ success: true });
				}
			})
			.catch((e) => {
				console.error(e);
				next(e);
			});
	}
);

router.put(
	"/jobs/:id",
	[
		body("customer_id", "Please provide a customer id").not().isEmpty(),
		body("branch_id", "Please provide a branch id").not().isEmpty(),
		body("worker_id", "Please provide a worker id").not().isEmpty(),
		body("details", "Details is required").not().isEmpty(),
		body("visit_on", "Visit date is required").not().isEmpty(),
		body("visit_time", "Visit time is required").not().isEmpty(),
		body("pay_rate", "Pay rate is required").not().isEmpty(),
	],
	(req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(200).json({ success: false, errors: errors.array() });
		}

		const { id } = req.params;
		const {
			customer_id,
			branch_id,
			worker_id,
			details,
			visit_on,
			visit_time,
			pay_rate,
		} = req.body;

		db.query(
			`
				UPDATE jobs 
				SET customer_id=$1, branch_id=$2, worker_id=$3, details=$4, visit_on=$5, visit_time=$6, pay_rate=$7
				WHERE id=$8
			`,
			[
				customer_id,
				branch_id,
				worker_id,
				details,
				visit_on,
				visit_time,
				pay_rate,
				id,
			]
		)
			.then(({ rowCount }) => {
				if (rowCount < 1) {
					return res
						.status(400)
						.json({ success: false, message: "Job not added." });
				} else {
					return res.json({ success: true });
				}
			})
			.catch((e) => {
				console.error(e);
				next(e);
			});
	}
);

router.put(
	"/jobs/:id/log_time",
	[
		body("start_time", "Please provide a start time").not().isEmpty(),
		body("end_time", "Please provide an end time").not().isEmpty(),
		check("start_time", "End time should be greater than start time")
			.exists()
			.custom((value, { req }) => value < req.body.end_time),
	],
	(req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(200).json({ success: false, errors: errors.array() });
		}

		const { id } = req.params;
		const { start_time, end_time } = req.body;

		db.query(
			`
				UPDATE jobs 
				SET start_time=$1, end_time=$2, status=1
				WHERE id=$3
			`,
			[start_time, end_time, id]
		)
			.then(({ rowCount }) => {
				if (rowCount < 1) {
					return res
						.status(400)
						.json({ success: false, message: "Job not updated." });
				} else {
					return res.json({ success: true });
				}
			})
			.catch((e) => {
				console.error(e);
				next(e);
			});
	}
);

export default router;
