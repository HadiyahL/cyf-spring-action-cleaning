import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import { CreateWorker, Jobs } from "./pages";

export function App() {
	return (
		<Router>
			<main role="main">
				<Link to="/">Home</Link>
				<br />
				<Link to="add-worker">Create cleaner</Link>
				<br />
				<Link to="jobs">Jobs</Link>
			</main>
			<Switch>
				<Route path="/add-worker">
					<CreateWorker />
				</Route>
				<Route path="/jobs">
					<Jobs />
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
