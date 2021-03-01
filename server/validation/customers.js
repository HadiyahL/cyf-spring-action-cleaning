import { body } from "express-validator";
import { checkErrors, phoneUtil } from ".";

const addCustomer = [
	body("email", "Please provide a valid email").isEmail().normalizeEmail(),
	body("email", "Max length is 60 characters").isLength({ max: 60 }),
	body("name", "Name is required").not().isEmpty().trim(),
	body("name", "Max length is 100 characters").isLength({ max: 100 }),
	body("customer_contact_name", "Contact name is required")
		.not()
		.isEmpty()
		.trim(),
	body("customer_contact_name", "Max length is 100 characters").isLength({
		max: 100,
	}),
	body("phone_number", "Not a valid GB number").custom((value) =>
		phoneUtil.isValidNumberForRegion(phoneUtil.parse(value, "GB"), "GB")
	),
	body("phone_number", "Phone is required").not().isEmpty(),
	body("archived", "Archived is required").isBoolean(),
	checkErrors,
];

export default {
	addCustomer,
	editCustomer: addCustomer,
};
