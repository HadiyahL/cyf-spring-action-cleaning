import React from "react";
import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { BrowserRouter } from "react-router-dom";
import { Auth0ProviderWithHistory } from "./components/auth";
import "./scss/index.scss";
import App from "./App";

const queryClient = new QueryClient();

ReactDOM.render(
	<BrowserRouter>
		<Auth0ProviderWithHistory>
			<QueryClientProvider client={queryClient}>
				<App />
				<ReactQueryDevtools initialIsOpen={false} />
			</QueryClientProvider>
		</Auth0ProviderWithHistory>
	</BrowserRouter>,
	document.getElementById("root")
);
