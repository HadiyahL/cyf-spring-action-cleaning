import React from "react";
import { Container } from "reactstrap";
import CreateWorkerReport from "../components/CreateWorkerReport";
import { Title } from "../components";

const WorkerReports = () => {
	return (
		<Container>
			<Title text="Cleaner Report" />
			<CreateWorkerReport />
		</Container>
	);
};

export default WorkerReports;
