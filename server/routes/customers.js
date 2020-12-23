import { Router } from "express";
import { body, validationResult } from "express-validator";
import db from "../db";
import { checkAuth, checkPermission } from "../middleware";

const router = new Router();

router.get(
	"/customers",
	checkAuth,
	checkPermission("get:customers"),
	(_, res, next) => {
		db.query("SELECT * FROM customers")
			.then(({ rows }) => {
				return res.json({ customers: rows });
			})
			.catch((e) => {
				console.error(e);
				next(e);
			});
	}
);

router.get(
	"/customers/:id",
	checkAuth,
	checkPermission("get:customers/:id"),
	(req, res, next) => {
		const { id } = req.params;

		db.query("SELECT * FROM customers WHERE id=$1", [id])
			.then(({ rows }) => {
				return res.json({ rows });
			})
			.catch((e) => {
				console.error(e);
				next(e);
			});
	}
);

router.post(
	"/customers",
	checkAuth,
	checkPermission("post:customers"),
	[
		body("email", "Please provide a valid email").isEmail(),
		body("name", "Name is required").not().isEmpty(),
		body("phone_number", "Phone is required").not().isEmpty(),
	],
	(req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(200).json({ success: false, errors: errors.array() });
		}

		const { name, email, phone_number } = req.body;

		db.query(
			` INSERT INTO customers (name, email, phone_number)
				VALUES ($1, $2, $3)
				RETURNING id`,
			[name, email, phone_number]
		)
			.then(({ rows, rowCount }) => {
				if (rowCount < 1) {
					return res
						.status(400)
						.json({ success: false, message: "Customer not added." });
				} else {
					return res.json({ success: true, id: rows[0].id });
				}
			})
			.catch((e) => {
				console.error(e);
				next(e);
			});
	}
);

router.put(
	"/customers/:id",
	checkAuth,
	checkPermission("put:customers/:id"),
	[
		body("email", "Please provide a valid email").isEmail(),
		body("name", "Name is required").not().isEmpty(),
		body("phone_number", "Phone is required").not().isEmpty(),
		body(
			"main_branch_id",
			"Main branch id is required (or set as null)"
		).exists(),
	],
	(req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(200).json({ success: false, errors: errors.array() });
		}
		const { id } = req.params;
		const { main_branch_id, name, email, phone_number } = req.body;

		db.query(
			`
			UPDATE customers
			SET main_branch_id=$1, name=$2, email=$3, phone_number=$4
			WHERE id=$5
		`,
			[main_branch_id, name, email, phone_number, id]
		)
			.then(({ rows }) => {
				res.json({ success: true, rows });
			})
			.catch((e) => {
				console.error(e);
				next(e);
			});
	}
);

export default router;
