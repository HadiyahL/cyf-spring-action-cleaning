import React from "react";

import HomepageText from "../components/HomepageText";
import LoginButton from "../components/auth/LoginButton";

const Homepage = () => {
	return (
		<div className="jumbotron">
			<HomepageText />
			<div className="homepage-button">
				<LoginButton />
			</div>
		</div>
	);
};

export default Homepage;
