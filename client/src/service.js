import { post } from "./api";

export const postWorkers = async (data) => {
	const response = await post("/workers", data);
	return response.data;
};

import { get } from "./api";

export const getCustomers = async (data) => {
	const response = await get("/customers", data);
	return response.data;
};
