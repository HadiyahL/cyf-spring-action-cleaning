import React from "react";
import { Switch, Route } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Navigation, Spinner } from "./components";
import { ProtectedRoute, config } from "./components/auth";
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
	HomePage,
	WorkerReports,
	CustomerReports,
	WorkerHomePage,
	WorkerJobs,
	WorkerJobPage,
} from "./pages";
import { ResultPage } from "./components";

export function App() {
	const { isLoading, error, user } = useAuth0();

	if (isLoading) {
		return <Spinner />;
	}

	if (error) {
		return <div>Oops... {error.message}</div>;
	}

	const role = user?.[config.roleUrl][0];

	return (
		<>
			<Navigation />
			<Switch>
				{role === "admin" && (
					<>
						<Route exact path="/">
							<HomePage />
						</Route>
						<ProtectedRoute path="/add-worker" component={CreateWorker} />
						<ProtectedRoute path="/add-customer" component={CreateCustomer} />
						<ProtectedRoute
							path="/edit-customer/:id"
							component={EditCustomer}
						/>
						<ProtectedRoute path="/customers" component={Customers} />
						<ProtectedRoute path="/jobs" component={Jobs} />
						<ProtectedRoute path="/workers" component={ShowWorkers} />
						<ProtectedRoute path="/edit-worker/:id" component={EditWorker} />
						<ProtectedRoute path="/create-job" component={CreateJob} />
						<ProtectedRoute path="/edit-jobs/:id" component={EditJob} />
						<ProtectedRoute path="/workers_report" component={WorkerReports} />
						<ProtectedRoute
							path="/customers_report"
							component={CustomerReports}
						/>
						<ProtectedRoute
							path="/result/:id/:start/:finish/:name/:type"
							component={ResultPage}
						/>
						<ProtectedRoute path="/create-jobs" component={Recurring} />
					</>
				)}
				{role === "worker" && (
					<>
						<Route exact path="/">
							<WorkerHomePage />
						</Route>
						<ProtectedRoute path="/jobs" component={WorkerJobs} />
						<ProtectedRoute path="/worker/job/:id" component={WorkerJobPage} />
					</>
				)}
			</Switch>
		</>
	);
}

export default App;
