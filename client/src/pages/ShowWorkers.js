import React from "react";
import { Container } from "reactstrap";
import { WorkersData, Title } from "../components";

const ShowWorkers = () => {
	return (
		<Container>
			<Title text="Cleaners" />
			<WorkersData />
		</Container>
	);
};

export default ShowWorkers;
