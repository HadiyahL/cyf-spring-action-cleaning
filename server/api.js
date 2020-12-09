import { Router } from "express";
import { body, validationResult } from "express-validator";
import { Connection } from "./db";

const router = new Router();

router.get("/workers", (_, res, next) => {
	Connection.connect((err, pool) => {
		if (err) {
			return next(err);
		}

		pool
			.query("SELECT * FROM workers")
			.then(({ rows }) => {
				return res.json({ workers: rows });
			})
			.catch((e) => {
				console.error(e);
				next(e);
			});
	});
});

router.get("/customers", (_, res, next) => {
	Connection.connect((err, pool) => {
		if (err) {
			return next(err);
		}

		pool
			.query("SELECT * FROM customers")
			.then(({ rows }) => {
				return res.json({ customers: rows });
			})
			.catch((e) => {
				console.error(e);
				next(e);
			});
	});
});

router.get("/jobs", (_, res, next) => {
	Connection.connect((err, pool) => {
		if (err) {
			return next(err);
		}

		pool
			.query(
				`SELECT j.id,
				CASE WHEN (j.end_code IS NOT NULL)
					THEN '3'
				WHEN (j.start_code IS NOT NULL)
					THEN '2'
				WHEN (j.unique_url IS NOT NULL)
					THEN '1'
				ELSE '0'
				END status,
				j.date_created, c.name customer, b.address, 
				j.visit_on, j.visit_time, w.name worker, 
				j.pay_rate, j.details
				FROM jobs j 
				INNER JOIN branches b ON j.branch_id=b.id 
				INNER JOIN customers c ON j.customer_id=c.id
				INNER JOIN workers w ON w.id=j.worker_id`
			)
			.then(({ rows }) => res.json({ jobs: rows }))
			.catch((e) => {
				console.error(e);
				next(e);
			});
	});
});

router.get("/branches/:customer_id", (req, res, next) => {
	Connection.connect((err, pool) => {
		if (err) {
			return next(err);
		}
		const customer_id = req.params.customer_id;
		pool
			.query(
				`SELECT b.id, b.address, b.contact_name, b.contact_phone, w.name worker_name 
				 FROM branches b
				 INNER JOIN workers w ON w.id=b.worker_id
				 WHERE b.customer_id=$1`,
				[customer_id]
			)
			.then(({ rows }) => {
				return res.json({ branches: rows });
			})
			.catch((e) => {
				console.error(e);
				next(e);
			});
	});
});

router.post(
	"/workers",
	[
		body("email", "Please provide a valid email").isEmail(),
		body("name", "Name is required").not().isEmpty(),
		body("address", "Address is required").not().isEmpty(),
		body("phone", "Phone is required").not().isEmpty(),
		body("whatsapp", "Whatsapp is required").not().isEmpty(),
		body("contract", "Contract is required").isBoolean(),
	],
	(req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(200).json({ success: false, errors: errors.array() });
		}

		const { name, address, email, phone, whatsapp, contract } = req.body;

		Connection.connect((err, pool) => {
			if (err) {
				return next(err);
			}

			pool
				.query(
					`INSERT INTO workers (name, email, phone_number, address, whatsapp, permanent_contract)
						VALUES ($1, $2, $3, $4, $5, $6)`,
					[name, email, phone, address, whatsapp, contract]
				)
				.then(({ rowCount }) => {
					if (rowCount < 1) {
						return res
							.status(400)
							.json({ success: false, message: "Worker not added." });
					} else {
						return res.json({ success: true });
					}
				})
				.catch((e) => {
					console.error(e);
					next(e);
				});
		});
	}
);

export default router;
