import { body } from "express-validator";
import { checkErrors, phoneUtil } from ".";

const addBranch = [
	body("address", "Address is required").not().isEmpty().trim(),
	body("address", "Max length is 100 characters").isLength({ max: 100 }),
	body("contact_name", "Contact name is required").exists(),
	body("contact_name", "Max length is 100 characters")
		.isLength({ max: 100 })
		.trim(),
	body("contact_phone", "Not a valid GB number").custom(
		(value) =>
			value === "" ||
			phoneUtil.isValidNumberForRegion(phoneUtil.parse(value, "GB"), "GB")
	),
	body("contact_phone", "Contact number is required").exists(),
	body("details", "Details is required").exists(),
	body("details", "Max length is 250 characters").isLength({ max: 250 }).trim(),
	body(
		"main_branch",
		"Specifying if a branch is main or not is required"
	).exists(),
	body("duration", "Duration is required").exists(),
	body("duration", "Duration should be an integer").isInt(),
	checkErrors,
];

export default {
	addBranch,
	editBranch: addBranch,
};
