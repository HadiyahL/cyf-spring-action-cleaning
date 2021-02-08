import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import { getJobs, postBatchOfJobs, getWorkersSelect } from "../service";
import { Table, Button, Container } from "reactstrap";
import DateFilter from "../components/Jobs/DateFilter";
import { sortByField, setCleaningTimeForNextWeek } from "../util/helpers";
import { Spinner, Title, BackButton } from "../components";
import { RecurringJobsTableHead, RecurringJobsTableBody } from "../components";
import useAuthorizationHeaders from "../hooks/useAuthorizationHeaders";
import { RecurringJobsContext } from "../contexts/RecurringJobs";

const Recurring = () => {
	const [state, setState] = useState({
		jobs: [],
		isLoading: true,
		error: null,
	});
	const [date, setDate] = useContext(RecurringJobsContext);
	const history = useHistory();
	const authorizationHeaders = useAuthorizationHeaders();
	const queryClient = useQueryClient();

	useEffect(() => {
		let isActive = true;

		const fetchJobs = () =>
			queryClient
				.fetchQuery("getJobs", () =>
					getJobs(date.startDate, date.endDate, authorizationHeaders)
				)
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
	}, [date.startDate, date.endDate, authorizationHeaders, queryClient]);

	useEffect(() => {
		const fetchWorkers = () =>
			queryClient
				.fetchQuery("getWorkersSelect", () =>
					getWorkersSelect(authorizationHeaders)
				)
				.then((res) => {
					setState((state) => ({
						...state,
						workers: res.workers,
					}));
				})
				.catch((e) => console.log(e));

		authorizationHeaders && fetchWorkers();
	}, [authorizationHeaders, queryClient]);

	const recurringJobsMutation = useMutation(
		({ data, options }) => {
			return postBatchOfJobs(data, options);
		},
		{
			onError: (error) => {
				console.log(error);
			},
			onSuccess: () => {
				history.push("/jobs");
			},
		}
	);

	const handleClick = () => {
		recurringJobsMutation.mutate({
			data: state,
			options: authorizationHeaders,
		});
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
				<DateFilter state={date} setState={setDate} />
				{sortedJobs.length < 1 ? (
					<div>No jobs found for the specified time.</div>
				) : (
					<>
						<Table striped hover responsive className="recurring-table mb-5">
							<RecurringJobsTableHead />
							<RecurringJobsTableBody
								data={sortedJobs}
								state={state}
								setState={setState}
							/>
						</Table>
						<div className="d-flex justify-content-end mb-4">
							<BackButton />
							<Button onClick={handleClick} color="success" className="ml-4">
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
