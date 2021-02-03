import { useQuery } from "react-query";
import { get } from "../api";
import useAuthorizationHeaders from "./useAuthorizationHeaders";

const useFetch = (url) => {
	const authorizationHeaders = useAuthorizationHeaders();
	const { data, isLoading, isIdle, error, refetch } = useQuery(
		url,
		() => get(url, authorizationHeaders),
		{
			enabled: !!authorizationHeaders,
		}
	);

	const status = { data, isLoading: isLoading || isIdle, error, refetch };
	if (data) {
		status.data = data.data;
	}

	return status;
};

export default useFetch;
