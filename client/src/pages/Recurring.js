import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getJobs, postBatchOfJobs } from "../service";
import { Table, Button, Container } from "reactstrap";
import DateFilter from "../components/Jobs/DateFilter";
import {
	getWeekFromDate,
	sortByField,
	addDaysToCleaningTime,
} from "../util/helpers";
import { Spinner } from "../components";
import { RecurringJobsTableHead, RecurringJobsTableBody } from "../components";
import useAuthorizationHeaders from "../hooks/useAuthorizationHeaders";

const Recurring = () => {
	const [state, setState] = useState({
		start_time: getWeekFromDate().start,
		end_time: getWeekFromDate().end,
		jobs: [],
		isLoading: true,
		error: null,
	});
	const history = useHistory();
	const authorizationHeaders = useAuthorizationHeaders();

	useEffect(() => {
		let isActive = true;

		getJobs(state.start_time, state.end_time)
			.then((data) => {
				if (isActive) {
					setState((state) => ({
						...state,
						isLoading: false,
						error: null,
						jobs: addDaysToCleaningTime(data.jobs, 14),
					}));
				}
			})
			.catch((error) => {
				setState((state) => ({
					...state,
					isLoading: false,
					error: error.message,
				}));
			});

		return () => {
			isActive = false;
		};
	}, [state.start_time, state.end_time]);

	const handleClick = () => {
		postBatchOfJobs(state, authorizationHeaders)
			.then(() => history.push("/jobs"))
			.catch((e) => console.log(e));
	};

	const { error, isLoading, jobs } = state;
	const sortedJobsByDate = sortByField(jobs, "customer", true);

	if (error) {
		return <div>Oops, something wrong</div>;
	} else if (isLoading) {
		return <Spinner />;
	} else {
		return (
			<Container className="pr-lg-5 pl-lg-5 jobs">
				<h2 className="text-center mt-4 mt-md-5 mb-5 mb-md-5">
					Recreate from previous jobs
				</h2>
				<DateFilter state={state} setState={setState} />
				<Table striped hover responsive className="recurring-table">
					<RecurringJobsTableHead />
					<RecurringJobsTableBody
						data={sortedJobsByDate}
						state={state}
						setState={setState}
					/>
				</Table>
				<div className="d-flex justify-content-end mb-4">
					<Button onClick={handleClick} color="success">
						Create {jobs.length} jobs
					</Button>
				</div>
			</Container>
		);
	}
};

export default Recurring;
