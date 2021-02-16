import React, { useContext } from "react";
// import { Redirect } from "react-router-dom";
import { WorkerReportContext } from "../contexts/WorkerReport";
// import PropTypes from "prop-types";
import { Container, Table } from "reactstrap";
import useFetch from "../../hooks/useFetch";
import { Spinner, Title, BackButton } from "../index";

const GeneralWorkerReport = () => {
	const [state] = useContext(WorkerReportContext);
	const { start_date, finish_date} = state;

	const { data, error, isLoading } = useFetch(
		`/general_reports/worker/${start_date}/${finish_date}`
	);
	const total_data = useFetch(
		`/general_reports/worker_total/${start_date}/${finish_date}`
	);

	if (total_data.error || error) {
		return <div>Error</div>;
	} else if (total_data.isLoading || isLoading) {
		return <Spinner />;
	} else if (total_data.data) {
		return (
			<Container>
				<Title text={"General cleaner's report"} />
				<h3 className="text-center mt-4 mt-md-5 mb-5 mb-md-5">
					{"Work duration from " + start_date + " to " + finish_date}
				</h3>
				{total_data.data.rows.length < 1 ? (
					<p>No data for this period.</p>
				) : (
					<Table striped hover responsive>
		
					</Table>
				)}
				<div className="d-flex justify-content-end mt-5">
					<BackButton />
				</div>
			</Container>
		);
	}
};

export default GeneralWorkerReport;
