import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import { getJobs, postBatchOfJobs, getWorkersSelect } from "../service";
import { Table, Button, Container } from "reactstrap";
import DateFilter from "../components/Jobs/DateFilter";
import { sortByField, setCleaningTimeForNextWeek } from "../util/helpers";
import {
  Spinner,
  Title,
  BackButton,
  RecurringJobsTableHead,
  RecurringJobsTableBody,
  WorkerFilter,
} from "../components";
import useAuthorizationHeaders from "../hooks/useAuthorizationHeaders";
import { RecurringJobsContext } from "../contexts/RecurringJobs";

const Recurring = () => {
  const [state, setState] = useState({
    originalJobs: [],
    jobs: [],
    isLoading: true,
    error: null,
    selectedWorker: "all",
  });
  const [workers, setWorkers] = useState({
    data: [],
    originalData: [],
  });
  const [date, setDate] = useContext(RecurringJobsContext);
  const history = useHistory();
  const authorizationHeaders = useAuthorizationHeaders();
  const queryClient = useQueryClient();

  useEffect(() => {
    const fetchWorkers = () =>
      queryClient
        .fetchQuery("getWorkersSelect", () =>
          getWorkersSelect(authorizationHeaders)
        )
        .then((data) => {
          setWorkers({
            data: data.workers,
            originalData: data.workers,
          });
        })
        .catch((e) => console.log(e));

    authorizationHeaders && fetchWorkers();
  }, [authorizationHeaders, queryClient]);

  useEffect(() => {
    let isActive = true;

    const filterBySelectedWorker = (jobs, selectedWorker) => {
      return selectedWorker === "all"
        ? jobs
        : jobs.filter(({ worker }) => worker === selectedWorker);
    };

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
              jobs: filterBySelectedWorker(
                setCleaningTimeForNextWeek(data.jobs),
                state.selectedWorker
              ),
              originalJobs: setCleaningTimeForNextWeek(data.jobs),
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
        <div className="d-flex justify-content-between">
          <DateFilter state={date} setState={setDate} />
          <WorkerFilter
            state={state}
            setState={setState}
            workers={workers.data}
          />
        </div>
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
                workers={workers}
                setWorkers={setWorkers}
              />
            </Table>
            <div className="d-flex justify-content-end mb-4">
              <BackButton />
              <Button onClick={handleClick} color="success" className="ml-4">
                Create {sortedJobs.length} job
                {sortedJobs.length > 1 && "s"}
              </Button>
            </div>
          </>
        )}
      </Container>
    );
  }
};

export default Recurring;
