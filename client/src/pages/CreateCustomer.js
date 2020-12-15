import React from "react";
import { Container } from "reactstrap";
import { CreateCustomerForm } from "../components";

const CreateCustomer = () => {
	return (
		<Container>
			<h2 className="text-center mt-4 mt-md-5 mb-5 mb-md-5">
				Add a new Client
			</h2>
			<CreateCustomerForm />
		</Container>
	);
};

export default CreateCustomer;
