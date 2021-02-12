import React from "react";
import { Container } from "reactstrap";
import { Title, CreateCustomerReport } from "../components";

const CustomerReports = () => {
	return (
		<Container>
			<Title text="Customer Report" />
			<CreateCustomerReport />
		</Container>
	);
};

export default CustomerReports;
