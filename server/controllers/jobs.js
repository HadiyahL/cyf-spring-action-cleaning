import db from "../db";
import { formatJobs } from "../util/formatJobs";
import { changeEmptyStringToNull } from "../util/transform";

const getJobs = (_, res, next) => {
	db.query(
		`SELECT j.*, b.address, c.name customer, w.name worker
		FROM jobs j 
		INNER JOIN branches b ON j.branch_id=b.id 
		INNER JOIN customers c ON j.customer_id=c.id
		INNER JOIN workers w ON w.id=j.worker_id ORDER BY visit_on, date_created`
	)
		.then(({ rows }) => {
			return res.json({ jobs: formatJobs(rows) });
		})
		.catch((e) => {
			console.error(e);
			next(e);
		});
};

const getJobsByRange = (req, res, next) => {
	const {
		query: { start, end },
	} = req;

	db.query(
		`SELECT j.*, b.address, c.name customer, w.name worker, b.details branch_details
		FROM jobs j
		INNER JOIN branches b ON j.branch_id=b.id
		INNER JOIN customers c ON j.customer_id=c.id
		INNER JOIN workers w ON w.id=j.worker_id
		WHERE j.visit_on >= $1 AND j.visit_on <= $2 AND c.archived='f'
	`,
		[start, end]
	)
		.then(({ rows }) => {
			return res.json({ jobs: formatJobs(rows) });
		})
		.catch((e) => {
			console.error(e);
			next(e);
		});
};

const getJobById = (req, res, next) => {
	const { id } = req.params;

	db.query(
		`
		SELECT j.*, c.name customer, b.address branch, w.name worker
		FROM jobs j
		INNER JOIN customers c ON j.customer_id=c.id
		INNER JOIN branches b ON j.branch_id=b.id
		INNER JOIN workers w ON j.worker_id=w.id
		WHERE j.id=$1`,
		[id]
	)
		.then(({ rows }) => {
			return res.json({ success: true, job: rows[0] });
		})
		.catch((e) => {
			console.error(e);
			next(e);
		});
};

const getJobDefaultsByCustomerId = async (req, res, next) => {
	const { id } = req.params;
	const client = await db.getClient();

	try {
		// customer has main branch and default worker
		const fullJobDetails = await client.query(
			`
			SELECT c.name customer_name, b.address, b.visit_time, b.duration, b.id branch_id, b.details branch_details, w.name worker_name, w.id worker_id
			FROM customers c
			INNER JOIN branches b ON c.id=b.customer_id
			INNER JOIN workers w ON w.id=b.worker_id
			WHERE c.id=$1 AND b.id=c.main_branch_id`,
			[id]
		);
		if (fullJobDetails.rows < 1) {
			// customer has main branch but no default worker
			const jobDetailsBranch = await client.query(
				`
			SELECT c.name customer_name, b.address, b.visit_time, b.duration, b.id branch_id, b.details branch_details
			FROM customers c
			INNER JOIN branches b ON c.id=b.customer_id
			WHERE c.id=$1 AND b.id=c.main_branch_id
		`,
				[id]
			);

			if (jobDetailsBranch.rows < 1) {
				// customer doesn't have main branch
				const jobDetailsNoBranch = await client.query(
					`
				SELECT c.name customer_name
				FROM customers c
				WHERE c.id=$1
				`,
					[id]
				);
				return res.json({ rows: jobDetailsNoBranch.rows });
			} else {
				return res.json({ rows: jobDetailsBranch.rows });
			}
		} else {
			return res.json({ rows: fullJobDetails.rows });
		}
	} catch (e) {
		next(e);
	} finally {
		client.release();
	}
};

const getJobDefaultsByBranchId = async (req, res, next) => {
	const { id } = req.params;
	const client = await db.getClient();

	try {
		// branch has default worker
		const branchDetailsFull = await client.query(
			`SELECT b.address, b.visit_time, b.duration, b.details branch_details, b.id branch_id, w.name worker_name, w.id worker_id
			FROM branches b
			INNER JOIN workers w ON w.id=b.worker_id
			WHERE b.id=$1`,
			[id]
		);
		if (branchDetailsFull.rows < 1) {
			// branch don't have default worker
			const branchDetailsNoDefaultWorker = await client.query(
				`SELECT b.address, b.visit_time, b.duration, b.id branch_id, b.details branch_details
				FROM branches b
				WHERE b.id=$1
		`,
				[id]
			);

			return res.json({ rows: branchDetailsNoDefaultWorker.rows });
		} else {
			return res.json({ rows: branchDetailsFull.rows });
		}
	} catch (e) {
		next(e);
	} finally {
		client.release();
	}
};

const getJobDefaultsByWorkerId = (req, res, next) => {
	const { id } = req.params;

	db.query(
		`SELECT w.name worker_name, w.id worker_id
		FROM workers w
		WHERE w.id=$1`,
		[id]
	)
		.then(({ rows }) => {
			return res.json({ rows });
		})
		.catch((e) => {
			console.error(e);
			next(e);
		});
};

const addJob = (req, res, next) => {
	const {
		customer_id,
		branch_id,
		worker_id,
		details,
		visit_on,
		duration,
		comment,
		cleaning_service,
	} = req.body;
	const visit_time = changeEmptyStringToNull(req.body.visit_time);
	const start_time = changeEmptyStringToNull(req.body.start_time);
	const end_time = changeEmptyStringToNull(req.body.end_time);
	const unit_price = changeEmptyStringToNull(req.body.unit_price);

	const date = new Date();
	const status = start_time && end_time ? 1 : 0;

	db.query(
		`INSERT INTO jobs (customer_id, branch_id, worker_id, details, visit_on, visit_time, unit_price, date_created, duration, start_time, end_time, status, comment, cleaning_service)
		VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)`,
		[
			customer_id,
			branch_id,
			worker_id,
			details,
			visit_on,
			visit_time,
			unit_price,
			date,
			duration,
			start_time,
			end_time,
			status,
			comment,
			cleaning_service,
		]
	)
		.then(({ rowCount }) => {
			if (rowCount < 1) {
				return res
					.status(400)
					.json({ success: false, message: "Job not added." });
			} else {
				return res.json({ success: true });
			}
		})
		.catch((e) => {
			console.error(e);
			next(e);
		});
};

const addBatchOfJobs = async (req, res, next) => {
	const { jobs } = req.body;
	const client = await db.getClient();

	try {
		jobs.forEach(
			async ({
				customer_id,
				branch_id,
				worker_id,
				details,
				visit_on,
				visit_time,
				unit_price,
				duration,
			}) => {
				await client.query(
					`INSERT INTO jobs (customer_id, branch_id, worker_id, details, visit_on, visit_time, unit_price, date_created, duration, start_time, end_time, status)
					VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
					[
						customer_id,
						branch_id,
						worker_id,
						details,
						visit_on,
						visit_time,
						unit_price,
						new Date(),
						duration ? parseInt(duration.split(":")[0]) : null,
						null,
						null,
						0,
					]
				);
			}
		);

		return res.status(200).json({ success: true });
	} catch (e) {
		next(e);
	} finally {
		client.release();
	}
};

const editJob = async (req, res, next) => {
	const { id } = req.params;
	const {
		customer_id,
		branch_id,
		worker_id,
		details,
		visit_on,
		duration,
		comment,
		cleaning_service,
	} = req.body;

	const visit_time = changeEmptyStringToNull(req.body.visit_time);
	const start_time = changeEmptyStringToNull(req.body.start_time);
	const end_time = changeEmptyStringToNull(req.body.end_time);
	const unit_price = changeEmptyStringToNull(req.body.unit_price);

	const status = start_time && end_time ? 1 : 0;

	const client = await db.getClient();

	try {
		await client.query(
			`
			UPDATE jobs 
			SET customer_id=$1, branch_id=$2, worker_id=$3, details=$4, visit_on=$5, visit_time=$6, unit_price=$7, duration=$8, start_time=$9, end_time=$10, status=$11, comment=$12, cleaning_service=$13
			WHERE id=$14
		`,
			[
				customer_id,
				branch_id,
				worker_id,
				details,
				visit_on,
				visit_time,
				unit_price,
				duration,
				start_time,
				end_time,
				status,
				comment,
				cleaning_service,
				id,
			]
		);

		const { rows } = await client.query(
			`
			SELECT j.*, c.name customer, b.address branch, w.name worker
			FROM jobs j
			INNER JOIN customers c ON j.customer_id=c.id
			INNER JOIN branches b ON j.branch_id=b.id
			INNER JOIN workers w ON j.worker_id=w.id
			WHERE j.id=$1`,
			[id]
		);
		return res.json({ success: true, job: rows[0] });
	} catch (e) {
		next(e);
	} finally {
		client.release();
	}
};

const workerLogTime = async (req, res, next) => {
	const email = req.user["https://springactioncleaning/email"];
	const { id } = req.params;
	const { feedback } = req.body;
	const startTime = changeEmptyStringToNull(req.body.startTime);
	const endTime = changeEmptyStringToNull(req.body.endTime);
	const status = startTime && endTime ? 1 : 0;

	const client = await db.getClient();

	try {
		await client.query(
			`
			UPDATE jobs j
			SET start_time=$1, end_time=$2, status=$3, feedback=$4
			FROM workers w
			WHERE j.id=$5 AND w.email=$6 AND j.status=0`,
			[startTime, endTime, status, feedback, id, email]
		);

		const { rows } = await client.query(
			`
			SELECT j.*, c.name customer, b.address branch, w.name worker
			FROM jobs j
			INNER JOIN customers c ON j.customer_id=c.id
			INNER JOIN branches b ON j.branch_id=b.id
			INNER JOIN workers w ON j.worker_id=w.id
			WHERE j.id=$1`,
			[id]
		);
		return res.json({ success: true, jobs: rows });
	} catch (e) {
		next(e);
	} finally {
		client.release();
	}
};

export default {
	getJobs,
	getJobsByRange,
	getJobById,
	getJobDefaultsByCustomerId,
	getJobDefaultsByBranchId,
	getJobDefaultsByWorkerId,
	addJob,
	addBatchOfJobs,
	editJob,
	workerLogTime,
};
