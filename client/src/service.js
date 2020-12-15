import { post, get } from "./api";

export const postWorkers = async (data) => {
	const response = await post("/workers", data);
	return response.data;
};

export const postCustomer = async (data) => {
	const response = await post("/customers", data);
	return response.data;
};

export const getCustomers = async () => {
	const response = await get("/customers");
	return response.data;
};

export const getWorkers = async () => {
	const response = await get("/workers");
	return response.data;
};
