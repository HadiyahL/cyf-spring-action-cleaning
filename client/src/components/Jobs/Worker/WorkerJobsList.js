import React, { useState } from "react";
import { Table } from "reactstrap";
import { useAuth0 } from "@auth0/auth0-react";
import { DateTime } from "luxon";
import useFetch from "../../../hooks/useFetch";
import Spinner from "../../UI/Spinner";
import WorkerJobsTableBody from "./WorkerJobsTableBody";
import DateFilter from "../DateFilter";

const WorkerJobsList = () => {
	const [state, setState] = useState({
		startDate: DateTime.local().toISODate(),
		endDate: "",
	});

	const {
		user: { email },
	} = useAuth0();
	const { isLoading, error, data } = useFetch(`workers/jobs?email=${email}`);

	const { startDate, endDate } = state;

	const filterByDate = (jobs) => {
		const afterStartTime = (time) => {
			if (!startDate) {
				return true;
			}
			const visitTime = new Date(time).getTime();
			const startTime = new Date(startDate).getTime();
			return visitTime >= startTime;
		};

		const beforeEndTime = (time) => {
			if (!endDate) {
				return true;
			}

			const visitTime = new Date(time).getTime();
			const endTime = new Date(endDate).getTime();
			return visitTime <= endTime;
		};

		return jobs.filter(
			(job) => afterStartTime(job.visit_on) && beforeEndTime(job.visit_on)
		);
	};

	if (error) {
		return <div>Oops, something went wrong.</div>;
	}
	if (isLoading) {
		return <Spinner />;
	}

	const filteredDataByDate = filterByDate(data.jobs);
	return (
		<div>
			<DateFilter state={state} setState={setState} />
			{filteredDataByDate.length === 0 ? (
				<div className="mt-5">No jobs found for this time period.</div>
			) : (
				<Table striped hover responsive>
					<thead>
						<tr>
							<th>Address</th>
							<th>Date</th>
							<th>Time</th>
						</tr>
					</thead>
					<WorkerJobsTableBody data={filteredDataByDate} />
				</Table>
			)}
		</div>
	);
};

export default WorkerJobsList;
