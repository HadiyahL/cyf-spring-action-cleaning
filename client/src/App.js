import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import { Navigation } from "./components";
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
	WorkerReports,
	CustomerReports,
} from "./pages";
import{ ResultPage } from "./components";

export function App() {
	return (
		<Router>
			<Navigation />
			<Switch>
				<Route path="/add-worker">
					<CreateWorker />
				</Route>
				<Route path="/add-customer">
					<CreateCustomer />
				</Route>
				<Route path="/edit-customer/:id">
					<EditCustomer />
				</Route>
				<Route path="/customers">
					<Customers />
				</Route>
				<Route path="/jobs">
					<Jobs />
				</Route>
				<Route path="/workers">
					<ShowWorkers />
				</Route>
				<Route path="/edit-worker/:id">
					<EditWorker />
				</Route>
				<Route path="/create-job">
					<CreateJob />
				</Route>
				<Route path="/edit-jobs/:id">
					<EditJob />
				</Route>
				<Route path="/workers_report">
					<WorkerReports />
				</Route>
				<Route path="/customers_report">
					<CustomerReports />
				</Route>
				<Route path="/result/:id/:start/:finish/:name/:type">
					<ResultPage />
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
