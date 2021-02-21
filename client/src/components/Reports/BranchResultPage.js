import React from "react";
import PropTypes from "prop-types";
import { Container, Table } from "reactstrap";
import useFetch from "../../hooks/useFetch";
import { Spinner, Title, BackButton } from "../index";
import ResultTableHead from "./ResultTableHead";
// import ResultTableBody from "./ResultTableBody";

const BranchResultPage = ({ state }) => {
	const {
		customer,
		customer_id,
		branch,
		branch_id,
		start_date,
		finish_date,
		detailed,
	} = state;
	const { data, error, isLoading } = useFetch(
		`/reports/branch${
			detailed ? "_detailed" : ""
		}/${customer_id}/${branch_id}/${start_date}/${finish_date}`
	);
	const total_data = useFetch(
		`/reports/branch_total/${customer_id}/${branch_id}/${start_date}/${finish_date}`
	);

	if (total_data.error || error) {
		return <div>Error</div>;
	} else if (total_data.isLoading || isLoading) {
		return <Spinner />;
	} else if (total_data.data) {
		return (
			<Container>
				<Title text={customer} />
				<Title text={branch} />
				<h3 className="text-center mt-4 mt-md-5 mb-5 mb-md-5">
					{"Work duration from " + start_date + " to " + finish_date}
				</h3>
				{total_data.data.rows.length < 1 ? (
					<p>No data for this period.</p>
				) : (
					<Table striped hover responsive>
						<ResultTableHead labels={data.labels} detailed={detailed} />
						{/* <ResultTableBody data={data.rows} detailed={detailed} />
						<ResultTableBody
							data={total_data.data.rows}
							tableFooter={true}
							detailed={detailed}
						/> */}
					</Table>
				)}
				<div className="d-flex justify-content-end mt-5">
					<BackButton />
				</div>
			</Container>
		);
	}
};

BranchResultPage.propTypes = {
	state: PropTypes.object,
};

export default BranchResultPage;
