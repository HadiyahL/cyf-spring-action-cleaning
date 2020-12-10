import { useEffect, useState } from "react";
import { get } from "../api";

const useFetch = (url) => {
	const [state, setState] = useState({
		isLoading: true,
		data: null,
		error: null,
	});

	useEffect(() => {
		setState({
			isLoading: true,
			data: null,
			error: null,
		});
		const fetchData = async () => {
			try {
				const res = await get(url);
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
		fetchData();
	}, [setState, url]);

	return state;
};

export default useFetch;
