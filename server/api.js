
import { Router } from "express";

import { Connection } from "./db";

const router = new Router();

router.get("/", (_, res, next) => {
	
	Connection.connect((err) => {
		if (err) {
			return next(err);
		}
		res.json({ message: "Hello, world!" });
	});
});

router.get("/clients", (_, res, next) => {
	Connection.connect((err, pool) => {
		if (err) {
			return next(err);
		}

		pool
			.query("SELECT * FROM clients")
			.then(({ rows }) => {
				return res.json({ clients: rows });
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
			.query("SELECT CASE WHEN  (j.end_code IS NOT NULL) THEN '3' WHEN (j.start_code IS NOT NULL) THEN '2' "
			+"WHEN (j.unique_url IS NOT NULL) THEN '1' ELSE '0' END status, j.date_created, c.name customer, a.address, "
			+"j.visit_on, j.visit_time, cl.name cleaner, "
			+"j.pay_rate FROM jobs j INNER JOIN addresses a ON j.address_id=a.id "
			+"INNER JOIN clients c ON j.client_id=c.id INNER JOIN cleaners cl ON cl.id=j.cleaner_id ")
			.then(({ rows }) => {
				// const jobs_list = rows.map(item => {item.status=((+!!item.unique_url)+(+!!item.start_code)+(+!!item.end_code));
				// return item; });
				return res.json({jobs: rows});
				// return res.json({jobs: jobs_list});
			})
			.catch((e) => {
				console.error(e);
				next(e);
			});
	});
});

router.get("/addresses/:customer_id", (req, res, next) => {
	Connection.connect((err, pool) => {
		if (err) {
			return next(err);
		}
		const customer_id = req.params.customer_id;
		pool
			.query(
				"SELECT a.address, a.contact_name , a.contact_phone, c.name cleaner_name "
				+"FROM addresses a INNER JOIN cleaners c ON c.id=a.cleaner_id WHERE a.client_id=$1",
				[customer_id]
			)
			.then(({ rows }) => {
				return res.json({ addresses: rows });
			})
			.catch((e) => {
				console.error(e);
				next(e);
			});
	});
});

router.post(
	"/create-cleaner",
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
		console.log("errors :>> ", errors);
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
