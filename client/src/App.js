import React from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import { useAuth0 } from "@auth0/auth0-react";
import { Navigation, Spinner } from "./components";
import { ProtectedRoute } from "./components/auth";
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
	HomePage,
} from "./pages";

export function App() {
	const { isLoading, error } = useAuth0();

	if (isLoading) {
		return <Spinner />;
	}
	if (error) {
		return <div>Oops... {error.message}</div>;
	}

	return (
		<>
			<Navigation />
			<Switch>
				<Route exact path="/">
					<HomePage />
				</Route>
				<ProtectedRoute path="/add-worker" component={CreateWorker} />
				<ProtectedRoute path="/add-customer" component={CreateCustomer} />
				<ProtectedRoute path="/edit-customer/:id" component={EditCustomer} />
				<ProtectedRoute path="/customers" component={Customers} />
				<ProtectedRoute path="/jobs" component={Jobs} />
				<ProtectedRoute path="/workers" component={ShowWorkers} />
				<ProtectedRoute path="/edit-worker/:id" component={EditWorker} />
				<ProtectedRoute path="/create-job" component={CreateJob} />
				<ProtectedRoute path="/edit-jobs/:id" component={EditJob} />
			</Switch>
		</>
	);
}

export default App;
