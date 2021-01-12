import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getJobs, postBatchOfJobs, getWorkers } from "../service";
import { Table, Button, Container } from "reactstrap";
import DateFilter from "../components/Jobs/DateFilter";
import {
	getWeekFromDate,
	sortByField,
	setCleaningTimeForNextWeek,
} from "../util/helpers";
import { Spinner, Title } from "../components";
import { RecurringJobsTableHead, RecurringJobsTableBody } from "../components";
import useAuthorizationHeaders from "../hooks/useAuthorizationHeaders";

const Recurring = () => {
	const [state, setState] = useState({
		startDate: getWeekFromDate().start,
		endDate: getWeekFromDate().end,
		jobs: [],
		isLoading: true,
		error: null,
	});
	const history = useHistory();
	const authorizationHeaders = useAuthorizationHeaders();

	useEffect(() => {
		let isActive = true;

		const fetchJobs = () =>
			getJobs(state.startDate, state.endDate, authorizationHeaders)
				.then((data) => {
					if (isActive) {
						setState((state) => ({
							...state,
							isLoading: false,
							error: null,
							jobs: setCleaningTimeForNextWeek(data.jobs),
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

		authorizationHeaders && fetchJobs();

		return () => {
			isActive = false;
		};
	}, [state.startDate, state.endDate, authorizationHeaders]);

	useEffect(() => {
		const fetchWorkers = () =>
			getWorkers(authorizationHeaders)
				.then((res) => {
					setState((state) => ({
						...state,
						workers: res.workers,
					}));
				})
				.catch((e) => console.log(e));

		authorizationHeaders && fetchWorkers();
	}, [authorizationHeaders]);

	const handleClick = () => {
		postBatchOfJobs(state, authorizationHeaders)
			.then(() => history.push("/jobs"))
			.catch((e) => console.log(e));
	};

	const { error, isLoading, jobs } = state;
	if (error) {
		return <div>Oops, something wrong</div>;
	} else if (isLoading) {
		return <Spinner />;
	} else {
		const sortedJobs = sortByField(jobs, "customer", true);
		return (
			<Container className="pr-lg-5 pl-lg-5 jobs">
				<Title text="Recreate from previous jobs" />
				<DateFilter state={state} setState={setState} />
				{sortedJobs.length < 1 ? (
					<div>No jobs found for the specified time.</div>
				) : (
					<>
						<Table striped hover responsive className="recurring-table">
							<RecurringJobsTableHead />
							<RecurringJobsTableBody
								data={sortedJobs}
								state={state}
								setState={setState}
							/>
						</Table>
						<div className="d-flex justify-content-end mb-4">
							<Button onClick={handleClick} color="success">
								Create {jobs.length} jobs
							</Button>
						</div>
					</>
				)}
			</Container>
		);
	}
};

export default Recurring;
