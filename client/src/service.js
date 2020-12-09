import { post } from "./api";

export const postCleaner = async (data) => {
	const response = await post("/cleaners", data);
	return response.data;
};
