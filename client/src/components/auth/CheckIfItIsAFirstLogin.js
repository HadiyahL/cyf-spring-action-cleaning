import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import config from "./config";

const CheckIfItIsAFirstLogin = () => {
	const { user } = useAuth0();

	useEffect(() => {
		const role = user?.[config.roleUrl][0];

		// (workaround)
		// User role on the first login (just after signup)
		// is not added to the user object
		// so we force page reload to get it.
		// It will happen only on the first login after signup to the application
		// For further logins role will be defined straight away
		if (user && role === undefined) {
			window.location.reload();
		}
	}, [user]);

	return null;
};

export default CheckIfItIsAFirstLogin;
