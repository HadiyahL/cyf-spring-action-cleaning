import { Router } from "express";
import { body, validationResult } from "express-validator";
import { PhoneNumberUtil } from "google-libphonenumber";
import db from "../db";
import { checkAuth, checkPermission } from "../middleware";

const router = new Router();
const phoneUtil = PhoneNumberUtil.getInstance();

router.get(
	"/customers",
	checkAuth,
	checkPermission("get:customers"),
	(_, res, next) => {
		db.query("SELECT * FROM customers ORDER BY name")
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
	"/customers/select",
	checkAuth,
	checkPermission("get:customers/select"),
	(_, res, next) => {
		db.query("SELECT * FROM customers WHERE archived='f'")
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
		body("email", "Max length is 60 characters").isLength({ max: 60 }),
		body("name", "Name is required").not().isEmpty(),
		body("name", "Max length is 100 characters").isLength({ max: 100 }),
		body("customer_contact_name", "Contact name is required").not().isEmpty(),
		body("customer_contact_name", "Max length is 100 characters").isLength({
			max: 100,
		}),
		body("phone_number", "Not a valid GB number").custom((value) =>
			phoneUtil.isValidNumberForRegion(phoneUtil.parse(value, "GB"), "GB")
		),
		body("phone_number", "Phone is required").not().isEmpty(),
		body("archived", "Archived is required").isBoolean(),
	],
	(req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(200).json({ success: false, errors: errors.array() });
		}

		const {
			name,
			email,
			phone_number,
			archived,
			customer_contact_name,
		} = req.body;

		db.query(
			` INSERT INTO customers (name, email, phone_number, archived, contact_name)
				VALUES ($1, $2, $3, $4, $5)
				RETURNING id`,
			[name, email, phone_number, archived, customer_contact_name]
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
		body("email", "Max length is 60 characters").isLength({ max: 60 }),
		body("name", "Name is required").not().isEmpty(),
		body("name", "Max length is 100 characters").isLength({ max: 100 }),
		body("customer_contact_name", "Contact name is required").not().isEmpty(),
		body("customer_contact_name", "Max length is 100 characters").isLength({
			max: 100,
		}),
		body("phone_number", "Not a valid GB number").custom((value) =>
			phoneUtil.isValidNumberForRegion(phoneUtil.parse(value, "GB"), "GB")
		),
		body("phone_number", "Phone is required").not().isEmpty(),
		body(
			"main_branch_id",
			"Main branch id is required (or set as null)"
		).exists(),
		body("archived", "Archived is required").isBoolean(),
	],
	(req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(200).json({ success: false, errors: errors.array() });
		}
		const { id } = req.params;
		const {
			main_branch_id,
			name,
			email,
			phone_number,
			archived,
			customer_contact_name,
		} = req.body;

		db.query(
			`
			UPDATE customers
			SET main_branch_id=$1, name=$2, email=$3, phone_number=$4, archived=$5, contact_name=$6
			WHERE id=$7
		`,
			[
				main_branch_id,
				name,
				email,
				phone_number,
				archived,
				customer_contact_name,
				id,
			]
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
