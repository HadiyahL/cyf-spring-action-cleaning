import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import { CreateWorker, ShowWorkers } from "./pages";

export function App() {
	const [kick, setKick] = useState(false);
	const workersHandle = () => setKick(!kick);
	return (
		<Router>
			<main role="main">
				<Link to="/">Home</Link>
				<br />
				<Link to="add-worker">Create cleaner</Link>
				<br />
				<Link to="workers" onClick={workersHandle}>Show cleaners</Link>
			</main>
			<Switch>
				<Route path="/add-worker">
					<CreateWorker />
				</Route>
				<Route path="/workers">
					<ShowWorkers kick={kick} />
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
