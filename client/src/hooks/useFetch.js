import { useEffect, useState } from "react";
import { get } from "../api";
import useAuthorizationHeaders from "./useAuthorizationHeaders";

const useFetch = (url, trigger) => {
	const [state, setState] = useState({
		isLoading: true,
		data: null,
		error: null,
	});
	const authorizationHeaders = useAuthorizationHeaders();

	useEffect(() => {
		setState({
			isLoading: true,
			data: null,
			error: null,
		});
		const fetchData = async () => {
			try {
				const res = await get(url, authorizationHeaders);
				setState({
					isLoading: false,
					data: res.data,
					error: null,
				});
			} catch (error) {
				setState({
					isLoading: false,
					data: null,
					error,
				});
			}
		};
		authorizationHeaders && fetchData();
	}, [url, trigger, authorizationHeaders]);

	return state;
};

export default useFetch;
