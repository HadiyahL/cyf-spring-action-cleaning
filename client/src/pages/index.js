import { lazy } from "react";

export const CreateWorker = lazy(() => import("./CreateWorker"));
export const CreateCustomer = lazy(() => import("./CreateCustomer"));
export const EditCustomer = lazy(() => import("./EditCustomer"));
export const Customers = lazy(() => import("./Customers"));
export const ShowWorkers = lazy(() => import("./ShowWorkers"));
export const Jobs = lazy(() => import("./Jobs"));
export const CreateJob = lazy(() => import("./CreateJob"));
export const EditJob = lazy(() => import("./EditJob"));
export const EditWorker = lazy(() => import("./EditWorker"));
export const Recurring = lazy(() => import("./Recurring"));
export const WorkerReports = lazy(() => import("./WorkerReports"));
export const CustomerReports = lazy(() => import("./CustomerReports"));
export const BranchReports = lazy(() => import("./BranchReports"));
export const WorkerJobs = lazy(() => import("./WorkerJobs"));
export const WorkerJobPage = lazy(() => import("./WorkerJobPage"));
export const HomePage = lazy(() => import("./HomePage"));
export const ReportPage = lazy(() => import("./ReportPage"));
export const BranchReportPage = lazy(() => import("./BranchReportPage"));
export const GeneralWorkerReport = lazy(() => import("./GeneralWorkerReport"));
export const GeneralCustomerReport = lazy(() =>
	import("./GeneralCustomerReport")
);
export const GeneralBranchReport = lazy(() =>
	import("./GeneralBranchReport")
);
