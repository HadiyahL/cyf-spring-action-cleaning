import { post, get, put } from "./api";

export const getWorkers = async (options) => {
	const response = await get("/workers", options);
	return response.data;
};

export const getWorker = async (id, options) => {
	const response = await get(`/jobs/workers/${id}`, options);
	return response.data;
};

export const postWorkers = async (data, options) => {
	const response = await post("/workers", data, options);
	return response.data;
};

export const putWorkers = async (worker_id, data, options) => {
	const response = await put(`/workers/${worker_id}`, data, options);
	return response.data;
};

export const getCustomers = async (options) => {
	const response = await get("/customers", options);
	return response.data;
};

export const postCustomer = async (data, options) => {
	const response = await post("/customers", data, options);
	return response.data;
};

export const putCustomer = async (id, data, options) => {
	const response = await put(`/customers/${id}`, data, options);
	return response.data;
};

export const getJobsCustomer = async (id, options) => {
	const response = await get(`/jobs/customers/${id}`, options);
	return response.data;
};

export const getBranches = async (id, options) => {
	const response = await get(`/branches/customer/${id}`, options);
	return response.data;
};

export const getBranch = async (id, options) => {
	const response = await get(`/jobs/branches/${id}`, options);
	return response.data;
};

export const postBranch = async (id, data, options) => {
	const response = await post(`/branches/${id}`, data, options);
	return response.data;
};

export const putBranch = async (branch_id, customer_id, data, options) => {
	const response = await put(
		`/branches/${customer_id}/${branch_id}`,
		data,
		options
	);
	return response.data;
};

export const postJobs = async (data, options) => {
	const response = await post("/jobs", data, options);
	return response.data;
};

export const putJobs = async (id, data, options) => {
	const response = await put(`/jobs/${id}`, data, options);
	return response.data;
};
