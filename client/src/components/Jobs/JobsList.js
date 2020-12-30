import React, { useState } from "react";
import { Table } from "reactstrap";
import useFetch from "../../hooks/useFetch";
import Spinner from "../UI/Spinner";
import JobsTableHead from "./JobsTableHead";
import JobsTableBody from "./JobsTableBody";
import DateFilter from "./DateFilter";
import StatusFilter from "./StatusFilter";
import { sortByField } from "../../util/helpers";

const JobsList = () => {
	const { data, error, isLoading } = useFetch("/jobs");
	const [state, setState] = useState({
		start_time: "",
		end_time: "",
		status: "",
	});
	const [sortBy, setSortBy] = useState("visit_on");
	const [isAscending, setIsAscending] = useState(null);

	const { start_time, end_time, status } = state;

	const filterByDate = (jobs) => {
		const afterStartTime = (time) => {
			if (!start_time) {
				return true;
			}
			const visitTime = new Date(time).getTime();
			const startTime = new Date(start_time).getTime();
			return visitTime >= startTime;
		};

		const beforeEndTime = (time) => {
			if (!end_time) {
				return true;
			}

			const visitTime = new Date(time).getTime();
			const endTime = new Date(end_time).getTime();
			return visitTime <= endTime;
		};

		return jobs.filter(
			(job) => afterStartTime(job.visit_on) && beforeEndTime(job.visit_on)
		);
	};

	const filterByStatus = (jobs) => {
		if (status === "") {
			return jobs;
		}

		return jobs.filter((job) => job.status === status);
	};

	const changeSearchField = (field) => {
		if (sortBy === field) {
			// toggling A-Z and Z-A on the same column
			setIsAscending(!isAscending);
		} else {
			// when clicked on different column sort ascending
			setIsAscending(true);
		}
		setSortBy(field);
	};

	if (error) {
		return <div>Oops, something went wrong.</div>;
	} else if (isLoading) {
		return <Spinner />;
	} else if (data) {
		const filteredDataByDate = filterByDate(data.jobs);
		const filteredDataByStatus = filterByStatus(filteredDataByDate);
		const sortedData = sortByField(filteredDataByStatus, sortBy, isAscending);

		return (
			<div>
				<div className="d-flex justify-content-between">
					<DateFilter state={state} setState={setState} />
					<StatusFilter state={state} setState={setState} />
				</div>
				<Table striped hover responsive>
					<JobsTableHead changeSearchField={changeSearchField} />
					<JobsTableBody data={sortedData} />
				</Table>
				{sortedData.length === 0 && <div>No matches</div>}
			</div>
		);
	}
};

export default JobsList;
