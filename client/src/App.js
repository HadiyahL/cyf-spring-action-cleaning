import React, { Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Navigation, Footer, Spinner } from "./components";
import {
	ProtectedRoute,
	config,
	CheckIfItIsAFirstLogin,
} from "./components/auth";
import {
	CreateWorker,
	CreateCustomer,
	EditCustomer,
	Customers,
	ShowWorkers,
	Jobs,
	CreateJob,
	EditJob,
	EditWorker,
	Recurring,
	WorkerReports,
	CustomerReports,
	BranchReports,
	WorkerJobs,
	WorkerJobPage,
	HomePage,
	ReportPage,
	BranchReportPage,
	GeneralWorkerReport,
	GeneralCustomerReport,
	GeneralBranchReport,
} from "./pages";
import ContextProviders from "./contexts/ContextProviders";

export function App() {
	const { isLoading, error, user, isAuthenticated } = useAuth0();

	if (isLoading) {
		return <Spinner />;
	}

	if (error) {
		return <div>Oops... {error.message}</div>;
	}

	const role = user?.[config.roleUrl][0];

	return (
		<ContextProviders>
			<main className="flex-shrink-0">
				<Navigation />
				<Suspense fallback={<Spinner />}>
					<Switch>
						{!isAuthenticated && (
							<>
								<Route exact path="/">
									<HomePage />
								</Route>
								<Redirect to="/" />
							</>
						)}
						{role === "admin" && (
							<>
								<ProtectedRoute exact path="/" component={Jobs} />
								<ProtectedRoute path="/add-worker" component={CreateWorker} />
								<ProtectedRoute
									path="/add-customer"
									component={CreateCustomer}
								/>
								<ProtectedRoute
									path="/edit-customer/:id"
									component={EditCustomer}
								/>
								<ProtectedRoute path="/customers" component={Customers} />
								<ProtectedRoute path="/jobs" component={Jobs} />
								<ProtectedRoute path="/workers" component={ShowWorkers} />
								<ProtectedRoute
									path="/edit-worker/:id"
									component={EditWorker}
								/>
								<ProtectedRoute path="/create-job" component={CreateJob} />
								<ProtectedRoute path="/edit-jobs/:id" component={EditJob} />
								<ProtectedRoute
									path="/workers_report"
									component={WorkerReports}
								/>
								<ProtectedRoute
									path="/customers_report"
									component={CustomerReports}
								/>
								<ProtectedRoute
									path="/branches_report"
									component={BranchReports}
								/>
								<ProtectedRoute path="/result_branch" component={BranchReportPage} />
								<ProtectedRoute path="/result/:type" component={ReportPage} />
								<ProtectedRoute
									path="/general_worker"
									component={GeneralWorkerReport}
								/>
								<ProtectedRoute
									path="/general_customer"
									component={GeneralCustomerReport}
								/>
								<ProtectedRoute
									path="/general_branch"
									component={GeneralBranchReport}
								/>
								<ProtectedRoute path="/create-jobs" component={Recurring} />
							</>
						)}
						{role === "worker" && (
							<>
								<ProtectedRoute exact path="/" component={WorkerJobs} />
								<ProtectedRoute path="/jobs" component={WorkerJobs} />
								<ProtectedRoute
									path="/worker/job/:id"
									component={WorkerJobPage}
								/>
							</>
						)}
					</Switch>
				</Suspense>
			</main>
			<Footer />
			<CheckIfItIsAFirstLogin />
		</ContextProviders>
	);
}

export default App;
