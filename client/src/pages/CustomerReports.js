import React from "react";
import { Container } from "reactstrap";
import { Title } from "../components";
import CreateCustomerReport from "../components/CreateCustomerReport";

const CustomerReports = () => {
	return (
		<Container>
			<Title text="Customer Report" />
			<CreateCustomerReport />
		</Container>
	);
};

export default CustomerReports;
