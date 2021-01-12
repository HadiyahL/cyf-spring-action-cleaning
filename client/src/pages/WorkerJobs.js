import React from "react";
import { Container } from "reactstrap";
import { WorkerJobsList, Title } from "../components";

const Jobs = () => {
	return (
		<Container fluid={true} className="pr-lg-5 pl-lg-5 jobs">
			<Title text="Your Jobs" />
			<WorkerJobsList />
		</Container>
	);
};

export default Jobs;
