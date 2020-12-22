import { Router } from "express";
// import { body } from "express-validator";
import db from "../db";

const router = new Router();

router.get("/reports/customer/:id", (req, res, next) => {
    const {id} = req.params;
	const { start_date, finish_date } = req.body;
    db.query(`SELECT  w.name, SUM((j.end_time-j.start_time)*j.pay_rate) pay, SUM(j.end_time - j.start_time) duration 
    FROM jobs j INNER JOIN branches b ON j.branch_id=b.id INNER JOIN workers w ON j.worker_id=w.id 
    WHERE j.customer_id=$1 AND j.visit_on BETWEEN  $2 AND $3 GROUP BY w.name`,[id, start_date, finish_date])
		.then(({ rows }) => {
			return res.json({ rows });
		})
		.catch((e) => {
			console.error(e);
			next(e);
		});
});

router.get("/reports/worker/:worker_id/:start/:finish", (req, res, next) => {
	const { worker_id, start, finish } = req.params;
	// const { start_date, finish_date } = req.body;
	db.query(
		`SELECT  c.name, b.address, SUM(j.end_time - j.start_time) duration 
	FROM jobs j INNER JOIN workers w ON j.worker_id=w.id INNER JOIN branches b ON j.branch_id=b.id 
	INNER JOIN customers c ON j.customer_id=c.id 
    WHERE w.id=$1 AND j.visit_on BETWEEN  $2 AND $3 GROUP BY (b.address, c.name)`,[worker_id, start, finish]
	)
		.then(({ rows }) => {
			return res.json({ rows });
		})
		.catch((e) => {
			console.error(e);
			next(e);
		});
});

// router.get("/branches/:branch_id", async (req, res, next) => {
// 	const { branch_id } = req.params;
// 	const client = await db.getClient();

// 	try {
// 		const result = await client.query(
// 			`SELECT b.*, w.name worker_name, w.id worker_id
// 			FROM branches b
// 			INNER JOIN workers w ON w.id=b.worker_id
// 			WHERE b.id=$1`,
// 			[branch_id]
// 		);

// 		if (result.rows < 1) {
// 			const result = await client.query("SELECT * FROM branches WHERE id=$1", [
// 				branch_id,
// 			]);
// 			return res.json({ rows: result.rows });
// 		} else {
// 			return res.json({ rows: result.rows });
// 		}
// 	} catch (e) {
// 		next(e);
// 	} finally {
// 		client.release();
// 	}
// });

// router.post(
// 	"/branches/:customerId",
// 	[
// 		body("address", "Address is required").not().isEmpty(),
// 		body("contact_name", "Contact name is required").exists(),
// 		body("contact_phone", "Contact phone is required").exists(),
// 		body("details", "Details is required").exists(),
// 		body(
// 			"main_branch",
// 			"Specifying if branch is main or not is required"
// 		).exists(),
// 	],
// 	async (req, res, next) => {
// 		const errors = validationResult(req);
// 		if (!errors.isEmpty()) {
// 			return res.status(200).json({ success: false, errors: errors.array() });
// 		}

// 		const { customerId } = req.params;
// 		const {
// 			address,
// 			contact_name,
// 			contact_phone,
// 			details,
// 			visit_time,
// 			duration,
// 			worker_id,
// 			main_branch,
// 		} = req.body;

// 		const client = await db.getClient();

// 		try {
// 			const result = await client.query(
// 				`
// 			INSERT INTO branches (address, contact_name, contact_phone, details, visit_time, duration, worker_id, customer_id)
// 			VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
// 			RETURNING id
// 			`,
// 				[
// 					address,
// 					contact_name,
// 					contact_phone,
// 					details,
// 					visit_time,
// 					duration,
// 					worker_id,
// 					customerId,
// 				]
// 			);

// 			if (main_branch) {
// 				const id = result.rows[0].id;
// 				const customer = await client.query(
// 					`
// 					UPDATE customers
// 					SET main_branch_id=$1
// 					WHERE id=$2
// 					`,
// 					[id, customerId]
// 				);
// 				return res.json({
// 					success: true,
// 					id: result.rows[0].id,
// 					mainBranchId: customer?.rows[0]?.main_branch_id ?? null,
// 				});
// 			}

// 			return res.json({ success: true, id: result.rows[0].id });
// 		} catch (e) {
// 			next(e);
// 		} finally {
// 			client.release();
// 		}
// 	}
// );

// router.put(
// 	"/branches/:customerId/:branchId",
// 	[
// 		body("address", "Address is required").not().isEmpty(),
// 		body("contact_name", "Contact name is required").exists(),
// 		body("contact_phone", "Contact number is required").exists(),
// 		body("details", "Details is required").exists(),
// 		body(
// 			"main_branch",
// 			"Specifying if branch is main or not is required"
// 		).exists(),
// 	],
// 	async (req, res, next) => {
// 		const errors = validationResult(req);
// 		if (!errors.isEmpty()) {
// 			return res.status(200).json({ success: false, errors: errors.array() });
// 		}

// 		const { customerId, branchId } = req.params;
// 		const {
// 			address,
// 			contact_name,
// 			contact_phone,
// 			details,
// 			visit_time,
// 			duration,
// 			worker_id,
// 			main_branch,
// 		} = req.body;

// 		const client = await db.getClient();

// 		try {
// 			await client.query(
// 				`
// 			UPDATE branches SET address=$1, contact_name=$2, contact_phone=$3, details=$4, visit_time=$5, duration=$6, worker_id=$7
// 			WHERE customer_id=$8 AND id=$9
// 			`,
// 				[
// 					address,
// 					contact_name,
// 					contact_phone,
// 					details,
// 					visit_time,
// 					duration,
// 					worker_id,
// 					customerId,
// 					branchId,
// 				]
// 			);

// 			if (main_branch) {
// 				await client.query(
// 					`
// 					UPDATE customers
// 					SET main_branch_id=$1
// 					WHERE id=$2
// 					`,
// 					[branchId, customerId]
// 				);
// 			}

// 			return res.json({ success: true });
// 		} catch (e) {
// 			next(e);
// 		} finally {
// 			client.release();
// 		}
// 	}
// );

export default router;
