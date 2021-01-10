import { Router } from "express";
import { body, validationResult } from "express-validator";
import { PhoneNumberUtil } from "google-libphonenumber";
import db from "../db";
import { checkAuth, checkPermission } from "../middleware";

const router = new Router();
const phoneUtil = PhoneNumberUtil.getInstance();

router.get(
	"/workers",
	checkAuth,
	checkPermission("get:workers"),
	(_, res, next) => {
		db.query("SELECT * FROM workers")
			.then(({ rows }) => {
				return res.json({ workers: rows });
			})
			.catch((e) => {
				console.error(e);
				next(e);
			});
	}
);

router.get(
	"/workers/:id",
	checkAuth,
	checkPermission("get:workersById"),
	(req, res, next) => {
		const { id } = req.params;

		db.query("SELECT * FROM workers WHERE id=$1", [id])
			.then(({ rows }) => {
				return res.json({ workers: rows });
			})
			.catch((e) => {
				console.error(e);
				next(e);
			});
	}
);

router.post(
	"/workers",
	checkAuth,
	checkPermission("post:workers"),
	[
		body("email", "Please provide a valid email").isEmail().normalizeEmail(),
		body("name", "Name is required").not().isEmpty().trim(),
		body("address", "Address is required").not().isEmpty().trim(),
		body("phone", "Not a valid GB number").custom((value) =>
			phoneUtil.isValidNumberForRegion(phoneUtil.parse(value, "GB"), "GB")
		),
		body("phone", "Phone is required").not().isEmpty().trim(),
		body("whatsapp", "Whatsapp is required").not().isEmpty().trim(),
		body("contract", "Contract is required").isBoolean(),
	],
	(req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(200).json({ success: false, errors: errors.array() });
		}

		const { name, address, email, phone, whatsapp, contract } = req.body;

		db.query(
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
	}
);

router.put(
	"/workers/:id",
	checkAuth,
	checkPermission("put:workers"),
	[
		body("email", "Please provide a valid email").isEmail().normalizeEmail(),
		body("name", "Name is required").not().isEmpty().trim(),
		body("address", "Address is required").not().isEmpty().trim(),
		body("phone", "Not a valid GB number").custom((value) =>
			phoneUtil.isValidNumberForRegion(phoneUtil.parse(value, "GB"), "GB")
		),
		body("phone", "Phone is required").not().isEmpty().trim(),
		body("whatsapp", "Whatsapp is required").not().isEmpty().trim(),
		body("contract", "Contract is required").isBoolean(),
	],
	(req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(200).json({ success: false, errors: errors.array() });
		}
		const { id } = req.params;
		const { name, address, email, phone, whatsapp, contract } = req.body;

		db.query(
			`
			UPDATE workers
			SET name=$1, address=$2, email=$3, phone_number=$4, whatsapp=$5, permanent_contract=$6
			WHERE id=$7 
			`,
			[name, address, email, phone, whatsapp, contract, id]
		)
			.then(() => {
				return res.json({ success: true });
			})
			.catch((e) => {
				console.error(e);
				next(e);
			});
	}
);

export default router;
