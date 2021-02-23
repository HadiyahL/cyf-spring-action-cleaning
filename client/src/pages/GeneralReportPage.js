import React from "react";
import { Container } from "reactstrap";
import { Title, GeneralReport } from "../components";

const GeneralReportPage = () => {
	return (
		<Container>
			<Title text="General Report" />
			<GeneralReport />
		</Container>
	);
};

export default GeneralReportPage;
