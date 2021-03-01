import db from "../db";

const getCustomers = (_, res, next) => {
	db.query("SELECT * FROM customers ORDER BY name")
		.then(({ rows }) => {
			return res.json({ customers: rows });
		})
		.catch((e) => {
			console.error(e);
			next(e);
		});
};

const getCustomersForSelect = (_, res, next) => {
	db.query("SELECT * FROM customers WHERE archived='f'")
		.then(({ rows }) => {
			return res.json({ customers: rows });
		})
		.catch((e) => {
			console.error(e);
			next(e);
		});
};

const getCustomerById = (req, res, next) => {
	const { id } = req.params;

	db.query("SELECT * FROM customers WHERE id=$1", [id])
		.then(({ rows }) => {
			return res.json({ rows });
		})
		.catch((e) => {
			console.error(e);
			next(e);
		});
};

const addCustomer = (req, res, next) => {
	const {
		name,
		email,
		phone_number,
		archived,
		customer_contact_name,
	} = req.body;

	db.query(
		` INSERT INTO customers (name, email, phone_number, archived, contact_name)
			VALUES ($1, $2, $3, $4, $5)
			RETURNING id`,
		[name, email, phone_number, archived, customer_contact_name]
	)
		.then(({ rows, rowCount }) => {
			if (rowCount < 1) {
				return res
					.status(400)
					.json({ success: false, message: "Customer not added." });
			} else {
				return res.json({ success: true, id: rows[0].id });
			}
		})
		.catch((e) => {
			console.error(e);
			next(e);
		});
};

const editCustomer = (req, res, next) => {
	const { id } = req.params;
	const {
		name,
		email,
		phone_number,
		archived,
		customer_contact_name,
	} = req.body;

	db.query(
		`
		UPDATE customers
		SET name=$1, email=$2, phone_number=$3, archived=$4, contact_name=$5
		WHERE id=$6
		RETURNING *
	`,
		[name, email, phone_number, archived, customer_contact_name, id]
	)
		.then(({ rows }) => {
			res.json({ success: true, rows });
		})
		.catch((e) => {
			console.error(e);
			next(e);
		});
};

export default {
	getCustomers,
	getCustomersForSelect,
	getCustomerById,
	addCustomer,
	editCustomer,
};
