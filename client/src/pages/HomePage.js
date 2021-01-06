import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Jobs from "./Jobs";
import { Container } from "reactstrap";

const HomePage = () => {
	const { isAuthenticated } = useAuth0();

	if (isAuthenticated) {
		return <Jobs />;
	} else {
		return (
			<Container className="mt-5">
				<h1 className="mb-5">Spring Action Cleaning</h1>
				<p>
					Currently data can be viewed by anyone on the Internet, so do not add
					any sensitive data yet.
				</p>
				<p>
					All data entered into the database will be wiped out before actual
					release.
				</p>
			</Container>
		);
	}
};

export default HomePage;
