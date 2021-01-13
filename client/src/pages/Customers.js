import React from "react";
import PropTypes from "prop-types";
import { Container } from "reactstrap";
import { ShowCustomers, AddNewButton, Title } from "../components";

const Customers = ({ customersTrigger }) => {
	return (
		<Container>
			<Title text="Clients" />
			<AddNewButton pathname="/add-customer" />
			<ShowCustomers customersTrigger={customersTrigger} />
		</Container>
	);
};

Customers.propTypes = { customersTrigger: PropTypes.bool };

export default Customers;
