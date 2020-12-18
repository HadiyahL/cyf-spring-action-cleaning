import React from "react";
import { Table } from "reactstrap";
import useFetch from "../../hooks/useFetch";
import Spinner from "../UI/Spinner";
import JobsTableHead from "./JobsTableHead";
import JobsTableBody from "./JobsTableBody";

const JobsList = () => {
	const { data, error, isLoading } = useFetch("/jobs");

	if (error) {
		return <div>Error</div>;
	} else if (isLoading) {
		return <Spinner />;
	} else if (data) {
		return (
			<div>
				<Table striped hover responsive>
					<JobsTableHead />
					<JobsTableBody data={data} />
				</Table>
			</div>
		);
	}
};

export default JobsList;
