import React from "react";
import PropTypes from "prop-types";
import { Container, Table } from "reactstrap";
import useFetch from "../../hooks/useFetch";
import { Spinner, Title, BackButton } from "../index";
import ResultTableHead from "./ResultTableHead";
import ResultTableBody from "./ResultTableBody";

const ResultPage = ({ start_date, finish_date, detailed, name, id, type }) => {
	const { data, error, isLoading } = useFetch(
		`/reports/${type}${
			detailed ? "_detailed" : ""
		}/${id}/${start_date}/${finish_date}`
	);

	if (error) {
		return <div>Error</div>;
	} else if (isLoading) {
		return <Spinner />;
	} else if (data) {
		return (
			<Container>
				<Title text={name} />
				<h3 className="text-center mt-4 mt-md-5 mb-5 mb-md-5">
					Work duration from {start_date} to {finish_date}
				</h3>
				{data.rows.length < 1 ? (
					<p>No data for this period.</p>
				) : (
					<Table striped hover responsive>
						<ResultTableHead labels={data.labels} detailed={detailed} />
						<ResultTableBody data={data.rows} type={type} detailed={detailed} />
						<ResultTableBody
							data={data.totals}
							tableFooter={true}
							detailed={detailed}
						/>
					</Table>
				)}
				<div className="d-flex justify-content-end mt-5">
					<BackButton />
				</div>
			</Container>
		);
	}
};

ResultPage.propTypes = {
	start_date: PropTypes.string.isRequired,
	finish_date: PropTypes.string.isRequired,
	detailed: PropTypes.bool.isRequired,
	name: PropTypes.string.isRequired,
	id: PropTypes.number.isRequired,
	type: PropTypes.string.isRequired,
};

export default ResultPage;
