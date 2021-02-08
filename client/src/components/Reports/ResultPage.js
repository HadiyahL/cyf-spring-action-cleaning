import React, { useContext } from "react";
import { Container, Table } from "reactstrap";
import useFetch from "../../hooks/useFetch";
import { Spinner, Title, BackButton } from "../index";
import ResultTableHead from "./ResultTableHead";
import ResultTableBody from "./ResultTableBody";
import { WorkerReportContext } from "../../contexts/WorkerReport";
import { CustomerReportContext } from "../../contexts/CustomerReport";
import { useParams, useHistory } from "react-router-dom";

const ResultPage = () => {
	const history = useHistory();
	const { type } = useParams();
	const [state] = useContext([CustomerReportContext, WorkerReportContext][Number(type === "worker")]);
	const { start_date, finish_date, detailed } = state;
	const name = [state.customer, state.worker][Number(type === "worker")];
	const id = [state.customer_id, state.worker_id][Number(type === "worker")];
	if (!id){
		history.push(`/${type}s_report`);
	}
	const { data, error, isLoading } = useFetch(
		`/reports/${type}${detailed ? "_detailed":""}/${id}/${start_date}/${finish_date}`
	);
	const total_data = useFetch(
		`/reports/${type}_total/${id}/${start_date}/${finish_date}`
	);

	if (total_data.error || error) {
		return <div>Error</div>;
	} else if (total_data.isLoading || isLoading) {
		return <Spinner />;
	} else if (total_data.data) {
		return (
			<Container>
				<Title text={name} />
				<h3 className="text-center mt-4 mt-md-5 mb-5 mb-md-5">
					{"Work duration from " + start_date + " to " + finish_date}
				</h3>
				{total_data.data.rows.length < 1 ? (
					<p>No data for this period.</p>
				) : (
					<Table striped hover responsive>
						<ResultTableHead
							labels={data.labels}
						/>
						<ResultTableBody data={data.rows}  type={type} detailed={detailed} />
						<ResultTableBody data={total_data.data.rows} tableFooter={true} detailed={detailed} />
					</Table>
				)}
				<div className="d-flex justify-content-end mt-5">
					<BackButton />
				</div>
			</Container>
		);
	}
};

export default ResultPage;
