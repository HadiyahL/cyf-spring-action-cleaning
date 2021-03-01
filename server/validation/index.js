import { validationResult } from "express-validator";
import { PhoneNumberUtil } from "google-libphonenumber";

export const checkErrors = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(200).json({ success: false, errors: errors.array() });
	}
	next();
};

export const phoneUtil = PhoneNumberUtil.getInstance();
