import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import { CreateWorker, ShowWorkers, Jobs } from "./pages";

export function App() {
	const [trigger, setTrigger] = useState(false);
	const workersHandle = () => setTrigger(!trigger);
	return (
		<Router>
			<main role="main">
				<Link to="/">Home</Link>
				<br />
				<Link to="add-worker">Create cleaner</Link>
				<br />
				<Link to="jobs">Jobs</Link>
				<br />
				<Link to="workers" onClick={workersHandle}>
					Show cleaners
				</Link>
			</main>
			<Switch>
				<Route path="/add-worker">
					<CreateWorker />
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
