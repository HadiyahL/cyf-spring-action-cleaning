import React, { useState } from "react";
import { Container,Table } from "reactstrap";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Spinner from "../UI/Spinner";
import ResultTableHead from "./ResultTableHead";
import ResultTableBody from "./ResultTableBody";

const ResultPage = () => {

	const { id, start, finish, name } = useParams();
	// const [state, setState]=useState(useFetch(`/reports/worker_total/${id}/${start}/${finish}`))
	// const { total_data, total_error, total_isLoading } = useFetch(`/reports/worker/${id}/${start}/${finish}`);
	const { data, error, isLoading } = useFetch(`/reports/worker/${id}/${start}/${finish}`);
	const total_data = useFetch(`/reports/worker_total/${id}/${start}/${finish}`);
	

	if (total_data.error) {
		return <div>Error</div>;
	} else if (total_data.isLoading ) {
		return <Spinner />;
	} else if (total_data.data) {
		console.log(data,"  ",total_data.data);
		return (
			<Container>
				<h2 className="text-center mt-4 mt-md-5 mb-5 mb-md-5">
					{name}
				</h2>
				<h3 className="text-center mt-4 mt-md-5 mb-5 mb-md-5">
					{"From: "+start+" To: "+finish}
				</h3>
				<Table striped hover responsive>
					<ResultTableHead labels={["Customer", "Address", "Duration"]} />
					<ResultTableBody data={data} bold="" />

					<ResultTableBody data={total_data.data} bold="total" />

				</Table>
			</Container>
		);
	}
};

export default ResultPage;