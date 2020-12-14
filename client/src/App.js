import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import { CreateWorker, CreateCustomer, Customers, ShowWorkers, Jobs } from "./pages";

export function App() {
	const [customersTrigger, setCustomersTrigger] = useState(false);
	const [trigger, setTrigger] = useState(false);
	const customersHandle = () => setCustomersTrigger(!customersTrigger);
	const workersHandle = () => setTrigger(!trigger);
	return (
		<Router>
			<main role="main">
				<Link to="/">Home</Link>
				<br />
				<Link to="add-worker">Create cleaner</Link>
				<br />
				<Link to="add-customer">Create Customer</Link>
				<br />
				<Link to="customers" onClick={customersHandle}>
          Customers
				</Link>
				<br />
				<Link to="workers" onClick={workersHandle}>
          Show cleaners
				</Link>
				<br />
				<Link to="jobs">Jobs</Link>
			</main>
			<Switch>
				<Route path="/add-worker">
					<CreateWorker />
				</Route>
				<Route path="/add-customer">
					<CreateCustomer />
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
			</Switch>
		</Router>
	);
}

export default App;