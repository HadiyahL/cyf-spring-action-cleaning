/* eslint-disable operator-linebreak */
import { Router } from "express";
import { body, validationResult } from "express-validator";
import { PhoneNumberUtil } from "google-libphonenumber";
import db from "../db";
import { checkAuth, checkPermission } from "../middleware";
import { changeEmptyStringToNull } from "../util/transform";

const router = new Router();
const phoneUtil = PhoneNumberUtil.getInstance();

router.get(
	"/branches",
	checkAuth,
	checkPermission("get:branches"),
	(_, res, next) => {
		db.query("SELECT * FROM branches")
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
	"/branches/customer/:customer_id",
	checkAuth,
	checkPermission("get:branches/customer/:customer_id"),
	(req, res, next) => {
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
	}
);

router.get(
	"/branches/:branch_id",
	checkAuth,
	checkPermission("get:branches/:branch_id"),
	async (req, res, next) => {
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
				const result = await client.query(
					"SELECT * FROM branches WHERE id=$1",
					[branch_id]
				);
				return res.json({ rows: result.rows });
			} else {
				return res.json({ rows: result.rows });
			}
		} catch (e) {
			next(e);
		} finally {
			client.release();
		}
	}
);

router.post(
	"/branches/:customerId",
	checkAuth,
	checkPermission("post:branches/:customerId"),
	[
		body("address", "Address is required").not().isEmpty().trim(),
		body("address", "Max length is 100 characters").isLength({ max: 100 }),
		body("contact_name", "Contact name is required").exists(),
		body("contact_name", "Max length is 100 characters")
			.isLength({ max: 100 })
			.trim(),
		body("contact_phone", "Not a valid GB number").custom(
			(value) =>
				value === "" ||
				phoneUtil.isValidNumberForRegion(phoneUtil.parse(value, "GB"), "GB")
		),
		body("contact_phone", "Contact phone is required").exists(),
		body("details", "Details is required").exists(),
		body("details", "Max length is 250 characters")
			.isLength({ max: 250 })
			.trim(),
		body(
			"main_branch",
			"Specifying if a branch is main or not is required"
		).exists(),
	],
	async (req, res, next) => {
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
			duration,
			worker_id,
			main_branch,
		} = req.body;
		const visit_time = changeEmptyStringToNull(req.body.visit_time);

		const client = await db.getClient();

		try {
			const result = await client.query(
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
			);

			if (main_branch) {
				const id = result.rows[0].id;
				const customer = await client.query(
					`
					UPDATE customers
					SET main_branch_id=$1
					WHERE id=$2
					`,
					[id, customerId]
				);
				return res.json({
					success: true,
					id: result.rows[0].id,
					mainBranchId: customer?.rows[0]?.main_branch_id ?? null,
				});
			}

			return res.json({ success: true, id: result.rows[0].id });
		} catch (e) {
			next(e);
		} finally {
			client.release();
		}
	}
);

router.put(
	"/branches/:customerId/:branchId",
	checkAuth,
	checkPermission("put:branches/:customerId/:branchId"),
	[
		body("address", "Address is required").not().isEmpty().trim(),
		body("address", "Max length is 100 characters").isLength({ max: 100 }),
		body("contact_name", "Contact name is required").exists(),
		body("contact_name", "Max length is 100 characters")
			.isLength({ max: 100 })
			.trim(),
		body("contact_phone", "Not a valid GB number").custom(
			(value) =>
				value === "" ||
				phoneUtil.isValidNumberForRegion(phoneUtil.parse(value, "GB"), "GB")
		),
		body("contact_phone", "Contact number is required").exists(),
		body("details", "Details is required").exists(),
		body("details", "Max length is 250 characters")
			.isLength({ max: 250 })
			.trim(),
		body(
			"main_branch",
			"Specifying if branch is main or not is required"
		).exists(),
	],
	async (req, res, next) => {
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
			duration,
			worker_id,
			main_branch,
		} = req.body;

		const visit_time = changeEmptyStringToNull(req.body.visit_time);

		const client = await db.getClient();

		try {
			await client.query(
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
			);

			if (main_branch) {
				await client.query(
					`
					UPDATE customers
					SET main_branch_id=$1
					WHERE id=$2
					`,
					[branchId, customerId]
				);
			}

			return res.json({ success: true });
		} catch (e) {
			next(e);
		} finally {
			client.release();
		}
	}
);

export default router;
