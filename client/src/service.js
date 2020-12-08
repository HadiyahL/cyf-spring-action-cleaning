import { get, post } from "./api";

// export const getMessage = async () => {
// 	const response = await get("/");
// 	return response.data.message;
// };

export const postCleaner = async (data) => {
	const response = await post("/create-cleaner", data);
	return response.data;
};
