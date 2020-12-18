import React from "react";
import PropTypes from "prop-types";
import { Container } from "reactstrap";
import { ShowCustomers, AddNewButton } from "../components";

const Customers = ({ customersTrigger }) => {
	return (
		<Container>
			<h2 className="text-center mt-4 mt-md-5 mb-5 mb-md-5">Clients</h2>
			<AddNewButton pathname="/add-customer" />
			<ShowCustomers customersTrigger={customersTrigger} />
		</Container>
	);
};

Customers.propTypes = { customersTrigger: PropTypes.bool };

export default Customers;
