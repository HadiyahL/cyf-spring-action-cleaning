import { Router } from "express";
import { checkAuth, checkPermission } from "../middleware";
import jobsController from "../controllers/jobs";
import validate from "../validation/jobs";

const router = new Router();

router.get(
	"/jobs/range",
	checkAuth,
	checkPermission("get:jobs/range"),
	jobsController.getJobsByRange
);

router.get(
	"/jobs/:id",
	checkAuth,
	checkPermission("get:jobs/:id"),
	jobsController.getJobById
);

router.get(
	"/jobs",
	checkAuth,
	checkPermission("get:jobs"),
	jobsController.getJobs
);

router.get(
	"/jobs/customers/:id",
	checkAuth,
	checkPermission("get:jobs/customers/:id"),
	jobsController.getJobDefaultsByCustomerId
);

router.get(
	"/jobs/branches/:id",
	checkAuth,
	checkPermission("get:jobs/branches/:id"),
	jobsController.getJobDefaultsByBranchId
);

router.get(
	"/jobs/workers/:id",
	checkAuth,
	checkPermission("get:jobs/workers/:id"),
	jobsController.getJobDefaultsByWorkerId
);

router.post(
	"/jobs",
	checkAuth,
	checkPermission("post:jobs"),
	validate.job,
	jobsController.addJob
);

router.post(
	"/batch_of_jobs",
	checkAuth,
	checkPermission("post:batch_of_jobs"),
	jobsController.addBatchOfJobs
);

router.put(
	"/jobs/:id",
	checkAuth,
	checkPermission("put:jobs/:id"),
	validate.job,
	jobsController.editJob
);

router.put(
	"/jobs/:id/log_time",
	checkAuth,
	checkPermission("put:jobs/:id/log_time"),
	validate.workerLogTime,
	jobsController.workerLogTime
);

export default router;
