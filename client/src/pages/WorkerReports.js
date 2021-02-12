import React from "react";
import { Container } from "reactstrap";
import { Title, CreateWorkerReport } from "../components";

const WorkerReports = () => {
	return (
		<Container>
			<Title text="Cleaner Report" />
			<CreateWorkerReport />
		</Container>
	);
};

export default WorkerReports;
