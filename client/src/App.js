import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import {
	CreateWorker,
	CreateCustomer,
	EditCustomer,
	Customers,
	ShowWorkers,
	Jobs,
	CreateJob,
} from "./pages";

export function App() {
	const [customersTrigger, setCustomersTrigger] = useState(false);
	const [trigger, setTrigger] = useState(false);
	const customersHandle = () => setCustomersTrigger(!customersTrigger);
	const workersHandle = () => setTrigger(!trigger);
	return (
		<Router>
			<main role="main">
				<Link className="mr-5" to="/">
					Home
				</Link>
				<Link className="mr-5" to="/customers" onClick={customersHandle}>
					Clients
				</Link>
				<Link className="mr-5" to="/workers" onClick={workersHandle}>
					Cleaners
				</Link>
				<Link className="mr-5" to="/jobs">
					Jobs
				</Link>
				<Link className="mr-5" to="/add-worker">
					Add Cleaner
				</Link>
				<Link className="mr-5" to="/add-customer">
					Add Client
				</Link>
				<Link className="mr-5" to="/create-job">
					Create Job
				</Link>
			</main>
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
					<Customers customersTrigger={customersTrigger} />
				</Route>
				<Route path="/jobs">
					<Jobs />
				</Route>
				<Route path="/workers">
					<ShowWorkers trigger={trigger} />
				</Route>
				<Route path="/create-job">
					<CreateJob />
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
