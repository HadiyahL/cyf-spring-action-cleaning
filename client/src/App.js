import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import { CreateCleaner } from "./pages";

export function App() {
	return (
		<Router>
			<main role="main">
				<Link to="/">Home</Link>
				<br />
				<Link to="create-cleaner">Create cleaner</Link>
			</main>
			<Switch>
				<Route path="/create-cleaner">
					<CreateCleaner />
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
