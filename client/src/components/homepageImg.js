import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import HomepageText from "./HomepageText";
import LoginButton from "./auth/LoginButton";


const HomepageImg=()=> {
	const { isAuthenticated } = useAuth0();
	return (
		<div className="jumbotron">
			<HomepageText />
			{!isAuthenticated && (
				<LoginButton />
			)}
		</div>
	);
};

export default HomepageImg;