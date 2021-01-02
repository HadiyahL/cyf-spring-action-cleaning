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
		let isActive = true;
		setState({
			isLoading: true,
			data: null,
			error: null,
		});
		const fetchData = async () => {
			try {
				const res = await get(url, authorizationHeaders);
				if (isActive) {
					setState({
						isLoading: false,
						data: res.data,
						error: null,
					});
				}
			} catch (error) {
				if (isActive) {
					setState({
						isLoading: false,
						data: null,
						error,
					});
				}
			}
		};
		authorizationHeaders && fetchData();

		return () => {
			isActive = false;
		};
	}, [url, trigger, authorizationHeaders]);

	return state;
};

export default useFetch;
