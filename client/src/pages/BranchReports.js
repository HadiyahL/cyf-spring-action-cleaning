import React from "react";
import { Container } from "reactstrap";
import { Title, CreateBranchReport } from "../components";

const BranchReports = () => {
	return (
		<Container>
			<Title text="Address Report" />
			<CreateBranchReport />
		</Container>
	);
};


export default BranchReports;