import { post, get } from "./api";

export const getWorkers = async () => {
	const response = await get("/workers");
	return response.data;
};

export const getWorker = async (id) => {
	const response = await get(`/jobs/workers/${id}`);
	return response.data;
};

export const postWorkers = async (data) => {
	const response = await post("/workers", data);
	return response.data;
};

export const getCustomers = async () => {
	const response = await get("/customers");
	return response.data;
};

export const getBranches = async (id) => {
	const response = await get(`/branches/customer/${id}`);
	return response.data;
};

export const getCustomer = async (id) => {
	const response = await get(`/jobs/customers/${id}`);
	return response.data;
};

export const getBranch = async (id) => {
	const response = await get(`/jobs/branches/${id}`);
	return response.data;
};

export const postJob = async (data) => {
	const response = await post("/jobs", data);
	return response.data;
};
