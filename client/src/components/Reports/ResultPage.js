import React, { useState } from "react";
import { Container,Table } from "reactstrap";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Spinner from "../UI/Spinner";
import ResultTableHead from "./ResultTableHead";
import ResultTableBody from "./ResultTableBody";

const ResultPage = () => {

	const { id, start, finish, name, type } = useParams();


	const { data, error, isLoading } = useFetch(`/reports/${type}/${id}/${start}/${finish}`);
	const total_data = useFetch(`/reports/${type}_total/${id}/${start}/${finish}`);


	if (total_data.error || error) {
		return <div>Error</div>;
	} else if (total_data.isLoading || isLoading ) {
		return <Spinner />;
	} else if (total_data.data) {
		return (
			<Container>
				<h2 className="text-center mt-4 mt-md-5 mb-5 mb-md-5">
					{name}
				</h2>
				<h3 className="text-center mt-4 mt-md-5 mb-5 mb-md-5">
					{"Work duration from: "+start+" to: "+finish}
				</h3>
				<Table striped hover responsive>
					<ResultTableHead labels={[["Address", "Cleaner", "Duration"],["Customer", "Address", "Duration"]][Number(type==="worker")]} />
					<ResultTableBody data={data} bold="" type={type} />

					<ResultTableBody data={total_data.data} bold="total" />

				</Table>
			</Container>
		);
	}
};

export default ResultPage;