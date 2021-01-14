import React from "react";

import HomepageText from "./HomepageText";
import LoginButton from "./auth/LoginButton";

const HomepageImg = () => {
	return (
		<div className="jumbotron">
			<HomepageText />
			<LoginButton />
		</div>
	);
};

export default HomepageImg;
