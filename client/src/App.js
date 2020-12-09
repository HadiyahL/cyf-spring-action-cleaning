import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import { CreateWorker, Customers } from "./pages";

export function App() {
	return (
    <Router>
      <main role="main">
        <Link to="/">Home</Link>
        <br />
        <Link to="add-worker">Create cleaner</Link>
        <br />
        <Link to="customers">Customers</Link>
      </main>
      <Switch>
        <Route path="/add-worker">
          <CreateWorker />
        </Route>
        <Route path="/customers">
          <Customers />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
