import React from "react";
import { Container } from "reactstrap";
import { JobsList, AddNewButton, Title } from "../components";

const Jobs = () => {
	return (
		<Container fluid={true} className="pr-lg-5 pl-lg-5 jobs">
			<Title text="Jobs" />
			<div className="d-flex justify-content-end align-items-center">
				<AddNewButton pathname="/create-job" />
				<div className="mr-4" />
				<AddNewButton pathname="/create-jobs" text="Recreate" />
			</div>
			<JobsList />
		</Container>
	);
};

export default Jobs;
