import { post } from "./api";

export const postWorkers = async (data) => {
	const response = await post("/workers", data);
	return response.data;
};
