import db from "../db";
import { formatWorkerJobs } from "../util/formatJobs";

const getWorkers = (_, res, next) => {
	db.query("SELECT * FROM workers ORDER BY name")
		.then(({ rows }) => {
			return res.json({ workers: rows });
		})
		.catch((e) => {
			console.error(e);
			next(e);
		});
};

const getWorkersForSelect = (_, res, next) => {
	db.query("SELECT * FROM workers WHERE archived='f'")
		.then(({ rows }) => {
			return res.json({ workers: rows });
		})
		.catch((e) => {
			console.error(e);
			next(e);
		});
};

const getWorkerById = (req, res, next) => {
	const { id } = req.params;

	db.query("SELECT * FROM workers WHERE id=$1", [id])
		.then(({ rows }) => {
			return res.json({ workers: rows });
		})
		.catch((e) => {
			console.error(e);
			next(e);
		});
};

const addWorker = async (req, res, next) => {
	const {
		name,
		address,
		email,
		phone,
		whatsapp,
		contract,
		languages,
		archived,
	} = req.body;

	const client = await db.getClient();

	try {
		const { rowCount } = await client.query(
			`
			SELECT * FROM workers
			WHERE email=$1
		`,
			[email]
		);

		if (rowCount > 0) {
			return res.status(200).json({
				success: false,
				errors: [
					{ msg: "Cleaner with this email already exists", param: "email" },
				],
			});
		}

		const data = await client.query(
			`INSERT INTO workers (name, email, phone_number, address, whatsapp, permanent_contract, languages, archived)
			VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
			[name, email, phone, address, whatsapp, contract, languages, archived]
		);

		if (data.rowCount < 1) {
			return res
				.status(400)
				.json({ success: false, message: "Worker not added." });
		} else {
			return res.json({ success: true });
		}
	} catch (e) {
		next(e);
	} finally {
		client.release();
	}
};

const editWorker = async (req, res, next) => {
	const { id } = req.params;
	const {
		name,
		address,
		email,
		phone,
		whatsapp,
		contract,
		languages,
		archived,
	} = req.body;

	const client = await db.getClient();
	try {
		const { rowCount } = await client.query(
			`
			SELECT * FROM workers w
			WHERE email = $1
			AND w.id != $2
		`,
			[email, id]
		);

		if (rowCount > 0) {
			return res.status(200).json({
				success: false,
				errors: [
					{ msg: "Cleaner with this email already exists", param: "email" },
				],
			});
		}

		const { rows } = await client.query(
			`
			UPDATE workers
			SET name=$1, address=$2, email=$3, phone_number=$4, whatsapp=$5, permanent_contract=$6, languages=$7, archived=$8
			WHERE id=$9
			RETURNING *
			`,
			[name, address, email, phone, whatsapp, contract, languages, archived, id]
		);
		return res.json({ success: true, workers: rows });
	} catch (e) {
		next(e);
	} finally {
		client.release();
	}
};

const getWorkerJobs = (req, res, next) => {
	db.query(
		`SELECT j.id, j.visit_on, j.visit_time, j.status, b.address, c.name
		FROM jobs j
		INNER JOIN branches b ON j.branch_id=b.id
		INNER JOIN workers w ON w.id=j.worker_id
		INNER JOIN customers c ON c.id=j.customer_id
		WHERE w.email=$1
		ORDER BY j.visit_on
		`,
		[req.user["https://springactioncleaning/email"]]
	)
		.then(({ rows }) => {
			return res.json({ jobs: formatWorkerJobs(rows) });
		})
		.catch((e) => {
			console.error(e);
			next(e);
		});
};

const getWorkerJobById = (req, res, next) => {
	const { id } = req.params;
	const email = req.user["https://springactioncleaning/email"];

	db.query(
		`SELECT b.address, b.contact_name, b.contact_phone, b.details branch_details, j.*, c.name customer, w.name worker, w.email
			FROM jobs j
			INNER JOIN branches b ON j.branch_id=b.id
			INNER JOIN customers c ON j.customer_id=c.id
			INNER JOIN workers w ON w.id=j.worker_id
			WHERE j.id=$1 AND w.email=$2
		`,
		[id, email]
	)
		.then(({ rows }) => {
			return res.json({ jobs: formatWorkerJobs(rows) });
		})
		.catch((e) => {
			console.error(e);
			next(e);
		});
};

export default {
	getWorkers,
	getWorkersForSelect,
	getWorkerById,
	addWorker,
	editWorker,
	getWorkerJobs,
	getWorkerJobById,
};
