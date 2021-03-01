import { Router } from "express";
import { checkAuth, checkPermission } from "../middleware";
import customersController from "../controllers/customers";
import validation from "../validation/customers";

const router = new Router();

router.get(
	"/customers",
	checkAuth,
	checkPermission("get:customers"),
	customersController.getCustomers
);

router.get(
	"/customers/select",
	checkAuth,
	checkPermission("get:customers/select"),
	customersController.getCustomersForSelect
);

router.get(
	"/customers/:id",
	checkAuth,
	checkPermission("get:customers/:id"),
	customersController.getCustomerById
);

router.post(
	"/customers",
	checkAuth,
	checkPermission("post:customers"),
	validation.addCustomer,
	customersController.addCustomer
);

router.put(
	"/customers/:id",
	checkAuth,
	checkPermission("put:customers/:id"),
	validation.editCustomer,
	customersController.editCustomer
);

export default router;
