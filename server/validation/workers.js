import { body } from "express-validator";
import { checkErrors, phoneUtil } from ".";

const addWorker = [
	body("email", "Please provide a valid email").isEmail().normalizeEmail(),
	body("email", "Max length is 60 characters").isLength({ max: 60 }),
	body("name", "Name is required").not().isEmpty().trim(),
	body("name", "Max length is 100 characters").isLength({ max: 100 }),
	body("address", "Address is required").not().isEmpty().trim(),
	body("address", "Max length is 100 characters").isLength({ max: 100 }),
	body("phone", "Not a valid GB number").custom((value) =>
		phoneUtil.isValidNumberForRegion(phoneUtil.parse(value, "GB"), "GB")
	),
	body("phone", "Phone is required").not().isEmpty().trim(),
	body("whatsapp", "Whatsapp is required").not().isEmpty().trim(),
	body("whatsapp", "Max length is 50 characters").isLength({ max: 50 }),
	body("contract", "Contract is required").isBoolean(),
	body("archived", "Archived is required").isBoolean(),
	body("languages", "Max length is 50 characters").isLength({ max: 50 }).trim(),
	checkErrors,
];

export default {
	addWorker,
	editWorker: addWorker,
};
