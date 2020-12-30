import React from "react";
import { Button } from "reactstrap";
import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton = () => {
	const { logout } = useAuth0();

	return (
		<Button
			size="sm"
			className="my-1"
			onClick={() => logout({ returnTo: window.location.origin })}
		>
			Log Out
		</Button>
	);
};

export default LogoutButton;
