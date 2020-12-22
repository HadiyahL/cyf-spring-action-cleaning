import React from "react";
import { Table } from "reactstrap";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Spinner from "../UI/Spinner";
import ResultTableHead from "./ResultTableHead";
import ResultTableBody from "./ResultTableBody";

const ResultPage = () => {

	const { id, start, finish, name } = useParams();

	const { data, error, isLoading } = useFetch(`/reports/worker/${id}/${start}/${finish}`);
	console.log(data);
	if (error) {
		return <div>Error</div>;
	} else if (isLoading) {
		return <Spinner />;
	} else if (data) {
		return (
			<div>
				<h2 className="text-center mt-4 mt-md-5 mb-5 mb-md-5">
					{name}
				</h2>
				<h3 className="text-center mt-4 mt-md-5 mb-5 mb-md-5">
					{start+" - "+finish}
				</h3>
				<Table striped hover responsive>
					<ResultTableHead labels={["Customer", "Address", "Duration"]} />
					<ResultTableBody data={data} />
				</Table>
			</div>
		);
	}
};

export default ResultPage;