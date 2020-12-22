import React from "react";
import { Container } from "reactstrap";
import CreateWorkerReport from "../components/CreateWorkerReport";

const Reports = () => {

	return (
		<Container>
			<h2 className="text-center mt-4 mt-md-5 mb-5 mb-md-5">
            Reports
			</h2>
			<CreateWorkerReport />
		</Container>

	);
};

export default Reports;