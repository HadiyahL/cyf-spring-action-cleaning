import { Router } from "express";
import { checkAuth, checkPermission } from "../middleware";
import reportsController from "../controllers/reports";

const router = new Router();

router.get(
	"/reports/worker/:worker_id/:start/:finish",
	checkAuth,
	checkPermission("get:reports/worker"),
	reportsController.getWorkerReport
);

router.get(
	"/reports/worker_detailed/:worker_id/:start/:finish",
	checkAuth,
	checkPermission("get:reports/worker_detailed"),
	reportsController.getWorkerReportDetailed
);

router.get(
	"/general_reports/worker/:start/:finish",
	checkAuth,
	checkPermission("get:general_reports/worker"),
	reportsController.getGeneralWorkersReport
);

router.get(
	"/reports/customer/:customer_id/:start/:finish",
	checkAuth,
	checkPermission("get:reports/customer"),
	reportsController.getCustomerReport
);

router.get(
	"/reports/customer_detailed/:customer_id/:start/:finish",
	checkAuth,
	checkPermission("get:reports/customer_detailed"),
	reportsController.getCustomerReportDetailed
);

router.get(
	"/general_reports/customer/:start/:finish",
	checkAuth,
	checkPermission("get:general_reports/customer"),
	reportsController.getGeneralCustomersReport
);

router.get(
	"/reports/branch/:customer_id/:branch_id/:start/:finish",
	checkAuth,
	checkPermission("get:reports/branch"),
	reportsController.getBranchReport
);

router.get(
	"/reports/branch_detailed/:customer_id/:branch_id/:start/:finish",
	checkAuth,
	checkPermission("get:reports/branch_detailed"),
	reportsController.getBranchReportDetailed
);

router.get(
	"/general_reports/branch/:customer_id/:start/:finish",
	checkAuth,
	checkPermission("get:general_reports/branch"),
	reportsController.getGeneralBranchesReport
);

router.get(
	"/general_reports/general/:start/:finish",
	checkAuth,
	checkPermission("get:general_reports/general"),
	reportsController.getGeneralReport
);

router.get(
	"/invoice/:customer_id/:start/:finish",
	checkAuth,
	checkPermission("get:invoice"),
	reportsController.getInvoice
);

export default router;
