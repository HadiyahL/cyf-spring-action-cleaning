import React, { useState } from "react";
import PropTypes from "prop-types";
import { Container } from "reactstrap";
import { CreateCustomerForm, Branches, Title } from "../components";

const CreateCustomer = ({
	email,
	id,
	main_branch_id,
	customer_name,
	phone_number,
	archived,
}) => {
	const [state, setState] = useState({
		name: customer_name || "",
		email: email || "",
		phone_number: phone_number || "",
		archived: archived || false,
		customer_id: id || "",
		main_branch_id: main_branch_id || null,
		duration: "1",
		address: "",
		contact_name: "",
		visit_time: "",
		details: "",
		contact_phone: "",
		branch_id: null,
		worker_id: null,
		main_branch: false,
	});

	const { customer_id, name } = state;

	return (
		<Container>
			<Title text={customer_id ? `${name}` : "Add a new Client"} />
			<CreateCustomerForm state={state} setState={setState} />
			{customer_id && <Branches state={state} setState={setState} />}
		</Container>
	);
};

CreateCustomer.propTypes = {
	email: PropTypes.string,
	id: PropTypes.number,
	main_branch_id: PropTypes.number,
	customer_name: PropTypes.string,
	phone_number: PropTypes.string,
	archived: PropTypes.bool,
};

export default CreateCustomer;
