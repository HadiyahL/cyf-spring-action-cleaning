import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Jobs from "./Jobs";

const HomePage = () => {
	const { isAuthenticated } = useAuth0();

	if (isAuthenticated) {
		return <Jobs />;
	} else {
		return (
			<div className="h1">
				Create something for this homepage hero section for not authenticated
				visitors.
			</div>
		);
	}
};

export default HomePage;
