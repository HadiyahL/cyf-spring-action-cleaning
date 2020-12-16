import { Router } from "express";
import { body, validationResult } from "express-validator";
import db from "../db";

const router = new Router();

router.get("/branches", (_, res, next) => {
	db.query("SELECT * FROM branches")
		.then(({ rows }) => {
			return res.json({ rows });
		})
		.catch((e) => {
			console.error(e);
			next(e);
		});
});

router.get("/branches/customer/:customer_id", (req, res, next) => {
	const { customer_id } = req.params;

	db.query(
		`
				SELECT *
				FROM branches b
				WHERE b.customer_id=$1`,
		[customer_id]
	)
		.then(({ rows }) => {
			return res.json({ rows });
		})
		.catch((e) => {
			console.error(e);
			next(e);
		});
});

router.get("/branches/:branch_id", async (req, res, next) => {
	const { branch_id } = req.params;
	const client = await db.getClient();

	try {
		const result = await client.query(
			`SELECT b.*, w.name worker_name, w.id worker_id
			FROM branches b
			INNER JOIN workers w ON w.id=b.worker_id
			WHERE b.id=$1`,
			[branch_id]
		);

		if (result.rows < 1) {
			const result = await client.query("SELECT * FROM branches WHERE id=$1", [
				branch_id,
			]);
			return res.json({ rows: result.rows });
		} else {
			return res.json({ rows: result.rows });
		}
	} catch (e) {
		next(e);
	} finally {
		client.release();
	}
});

router.post(
	"/branches/:customerId",
	[
		body("address", "Address is required").not().isEmpty(),
		body("contact_name", "Contact name is required").exists(),
		body("contact_phone", "Contact phone is required").exists(),
		body("details", "Details is required").exists(),
	],
	(req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(200).json({ success: false, errors: errors.array() });
		}

		const { customerId } = req.params;
		const {
			address,
			contact_name,
			contact_phone,
			details,
			visit_time,
			duration,
			worker_id,
		} = req.body;

		db.query(
			`
			INSERT INTO branches (address, contact_name, contact_phone, details, visit_time, duration, worker_id, customer_id)
			VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
			RETURNING id
			`,
			[
				address,
				contact_name,
				contact_phone,
				details,
				visit_time,
				duration,
				worker_id,
				customerId,
			]
		)
			.then(({ rows }) => {
				res.json({ success: true, id: rows[0].id });
			})
			.catch((e) => {
				console.error(e);
				next(e);
			});
	}
);

router.put(
	"/branches/:customerId/:branchId",
	[
		body("address", "Address is required").not().isEmpty(),
		body("contact_name", "Contact name is required").exists(),
		body("contact_phone", "Contact number is required").exists(),
		body("details", "Details is required").exists(),
	],
	(req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(200).json({ success: false, errors: errors.array() });
		}

		const { customerId, branchId } = req.params;
		const {
			address,
			contact_name,
			contact_phone,
			details,
			visit_time,
			duration,
			worker_id,
		} = req.body;

		db.query(
			`
			UPDATE branches SET address=$1, contact_name=$2, contact_phone=$3, details=$4, visit_time=$5, duration=$6, worker_id=$7
			WHERE customer_id=$8 AND id=$9
			`,
			[
				address,
				contact_name,
				contact_phone,
				details,
				visit_time,
				duration,
				worker_id,
				customerId,
				branchId,
			]
		)
			.then(() => {
				res.json({ success: true });
			})
			.catch((e) => {
				console.error(e);
				next(e);
			});
	}
);

export default router;
