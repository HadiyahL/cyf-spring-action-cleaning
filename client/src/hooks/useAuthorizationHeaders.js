import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { config } from "../components/auth";

const useAuthorizationHeaders = () => {
	const [options, setOptions] = useState(null);
	const { getAccessTokenSilently } = useAuth0();

	useEffect(() => {
		const getToken = async () => {
			try {
				const token = await getAccessTokenSilently({
					audience: config.audience,
				});

				setOptions({
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
			} catch (e) {
				console.log(e);
			}
		};
		getToken();
	}, [getAccessTokenSilently]);

	return options;
};

export default useAuthorizationHeaders;
