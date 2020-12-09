import { Router } from "express";
import { body, validationResult } from "express-validator";
import { Connection } from "./db";

const router = new Router();

router.get("/cleaners", (_, res, next) => {
	Connection.connect((err, pool) => {
		if (err) {
			return next(err);
		}

		pool
			.query("SELECT * FROM cleaners")
			.then(({ rows }) => {
				return res.json({ cleaners: rows });
			})
			.catch((e) => {
				console.error(e);
				next(e);
			});
	});
});

router.post(
	"/cleaners",
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
					"insert into cleaners (name, email, phone_number, address, whatsapp, permanent_contract) values ($1, $2, $3, $4, $5, $6)",
					[name, email, phone, address, whatsapp, contract]
				)
				.then(({ rowCount }) => {
					if (rowCount < 1) {
						return res
							.status(400)
							.json({ success: false, message: "Cleaner not added." });
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
