import { post, get } from "./api";

export const postWorkers = async (data) => {
	const response = await post("/workers", data);
	return response.data;
};








export const getWorkers = async () => {
	const response = await get("/workers");
	return response.data;
};