import React from "react";
import { Container } from "reactstrap";
import { WorkerJobsList } from "../components";

const Jobs = () => {
	return (
		<Container fluid={true} className="pr-lg-5 pl-lg-5 jobs">
			<h2 className="text-center mt-4 mt-md-5 mb-5 mb-md-5">Your Jobs</h2>
			<WorkerJobsList />
		</Container>
	);
};

export default Jobs;
