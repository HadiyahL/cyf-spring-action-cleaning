import React from "react";
import { Container } from "reactstrap";
import { Title, CustomersData } from "../components";

const Customers = () => {
	return (
		<Container>
			<Title text="Clients" />
			<CustomersData />
		</Container>
	);
};

export default Customers;
