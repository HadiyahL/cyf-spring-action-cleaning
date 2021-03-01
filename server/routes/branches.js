import { Router } from "express";
import { checkAuth, checkPermission } from "../middleware";
import branchesController from "../controllers/branches";
import validate from "../validation/branches";

const router = new Router();

router.get(
	"/branches",
	checkAuth,
	checkPermission("get:branches"),
	branchesController.getBranches
);

router.get(
	"/branches/customer/:customer_id",
	checkAuth,
	checkPermission("get:branches/customer/:customer_id"),
	branchesController.getBranchesByCustomerId
);

router.get(
	"/branches/:branch_id",
	checkAuth,
	checkPermission("get:branches/:branch_id"),
	branchesController.getBranchById
);

router.post(
	"/branches/:customerId",
	checkAuth,
	checkPermission("post:branches/:customerId"),
	validate.addBranch,
	branchesController.addBranch
);

router.put(
	"/branches/:customerId/:branchId",
	checkAuth,
	checkPermission("put:branches/:customerId/:branchId"),
	validate.editBranch,
	branchesController.editBranch
);

export default router;
