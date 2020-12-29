import React from "react";
import { Container } from "reactstrap";
import CreateCustomerReport from "../components/CreateCustomerReport";


const CustomerReports = () => {

	return (
		<Container>
			<h2 className="text-center mt-4 mt-md-5 mb-5 mb-md-5">
            Client Report
			</h2>
			<CreateCustomerReport />
		</Container>

	);
};

export default CustomerReports;