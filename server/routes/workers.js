import { Router } from "express";
import { checkAuth, checkPermission } from "../middleware";
import workersController from "../controllers/workers";
import validate from "../validation/workers";

const router = new Router();

router.get(
	"/workers",
	checkAuth,
	checkPermission("get:workers"),
	workersController.getWorkers
);

router.get(
	"/workers/select",
	checkAuth,
	checkPermission("get:workers/select"),
	workersController.getWorkersForSelect
);

router.get(
	"/workers/jobs",
	checkAuth,
	checkPermission("get:workers/jobs"),
	workersController.getWorkerJobs
);

router.get(
	"/workers/:id",
	checkAuth,
	checkPermission("get:workersById"),
	workersController.getWorkerById
);

router.get(
	"/workers/job/:id",
	checkAuth,
	checkPermission("get:workers/job/:id"),
	workersController.getWorkerJobById
);

router.post(
	"/workers",
	checkAuth,
	checkPermission("post:workers"),
	validate.addWorker,
	workersController.addWorker
);

router.put(
	"/workers/:id",
	checkAuth,
	checkPermission("put:workers"),
	validate.editWorker,
	workersController.editWorker
);

export default router;
