import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import { config } from "../auth";

const Auth0ProviderWithHistory = ({ children }) => {
	const { domain, clientId } = config;
	const history = useHistory();

	const onRedirectCallback = (appState) => {
		history.push(appState?.returnTo || window.location.pathname);
	};

	return (
		<Auth0Provider
			domain={domain}
			clientId={clientId}
			redirectUri={window.location.origin}
			onRedirectCallback={onRedirectCallback}
		>
			{children}
		</Auth0Provider>
	);
};

Auth0ProviderWithHistory.propTypes = {
	children: PropTypes.object,
};

export default Auth0ProviderWithHistory;
