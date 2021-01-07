import React from "react";
import { Container } from "reactstrap";
import { JobsList, AddNewButton } from "../components";

const Jobs = () => {
	return (
		<Container fluid={true} className="pr-lg-5 pl-lg-5 jobs">
			<h2 className="text-center mt-4 mt-md-5 mb-5 mb-md-5">Jobs</h2>
			<div className="d-flex justify-content-end align-items-center">
				<AddNewButton pathname="/create-job" />
				<div className="mr-3" />
				<AddNewButton pathname="/create-jobs" text="Recreate" />
			</div>
			<JobsList />
		</Container>
	);
};

export default Jobs;
