import React from "react";
import PropTypes from "prop-types";
import { Route } from "react-router-dom";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import Spinner from "../UI/Spinner";

const ProtectedRoute = ({ component, ...args }) => (
	<Route
		component={withAuthenticationRequired(component, {
			// eslint-disable-next-line react/display-name
			onRedirecting: () => <Spinner />,
		})}
		{...args}
	/>
);

ProtectedRoute.propTypes = {
	component: PropTypes.func,
};

export default ProtectedRoute;
