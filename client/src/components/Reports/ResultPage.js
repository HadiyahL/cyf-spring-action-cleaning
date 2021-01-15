import React from "react";
import { Container, Table } from "reactstrap";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { Spinner, Title, BackButton } from "../index";
import ResultTableHead from "./ResultTableHead";
import ResultTableBody from "./ResultTableBody";

const ResultPage = () => {
	const { id, start, finish, name, type } = useParams();

	const { data, error, isLoading } = useFetch(
		`/reports/${type}/${id}/${start}/${finish}`
	);
	const total_data = useFetch(
		`/reports/${type}_total/${id}/${start}/${finish}`
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
					{"Work duration from " + start + " to " + finish}
				</h3>
				{total_data.data.rows.length < 1 ? (
					<p>No data for this period.</p>
				) : (
					<Table striped hover responsive>
						<ResultTableHead
							labels={
								[
									["Address", "Cleaner", "Duration"],
									["Customer", "Address", "Duration"],
								][Number(type === "worker")]
							}
						/>
						<ResultTableBody data={data} bold="" type={type} />
						<ResultTableBody data={total_data.data} bold="total" />
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
