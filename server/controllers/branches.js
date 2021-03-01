import db from "../db";
import { changeEmptyStringToNull } from "../util/transform";

const getBranches = (req, res, next) => {
	db.query("SELECT * FROM branches")
		.then(({ rows }) => {
			return res.json({ rows });
		})
		.catch((e) => {
			console.error(e);
			next(e);
		});
};

const getBranchesByCustomerId = (req, res, next) => {
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
};

const getBranchById = async (req, res, next) => {
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
};

const addBranch = async (req, res, next) => {
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
};

const editBranch = async (req, res, next) => {
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
};

export default {
	getBranches,
	getBranchesByCustomerId,
	getBranchById,
	addBranch,
	editBranch,
};
