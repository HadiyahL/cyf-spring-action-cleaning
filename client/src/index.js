import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Auth0ProviderWithHistory } from "./components/auth";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";

ReactDOM.render(
	<BrowserRouter>
		<Auth0ProviderWithHistory>
			<App />
		</Auth0ProviderWithHistory>
	</BrowserRouter>,
	document.getElementById("root")
);
