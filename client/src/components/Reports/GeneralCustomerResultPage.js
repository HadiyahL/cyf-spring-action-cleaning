import React from "react";
import { Container, Table } from "reactstrap";
import { Spinner, Title, BackButton } from "../index";
import PropTypes from "prop-types";
import useFetch from "../../hooks/useFetch";
import ResultTableHead from "./ResultTableHead";
import GeneralCustomerTable from "./GeneralCustomerTable";

const GeneralCustomerResultPage = ({
	start_date,
	finish_date,
	state,
	setState,
	type,
}) => {
	const { data, error, isLoading } = useFetch(
		`/general_reports/customer/${start_date}/${finish_date}`
	);

	if (error) {
		return <div>Error</div>;
	} else if (isLoading) {
		return <Spinner />;
	} else if (data) {
		return (
			<Container>
				<Title
					text={`General report${
						type === "customer" ? "" : " for addresses"
					} of customers`}
				/>
				<h3 className="text-center mt-4 mt-md-5 mb-5 mb-md-5">
					{"Work duration from " + start_date + " to " + finish_date}
				</h3>
				{data.rows.length < 1 ? (
					<p>No data for this period.</p>
				) : (
					<Table striped hover responsive>
						<ResultTableHead
							labels={["Customer", "Planned duration", "Actual duration"]}
							detailed={false}
						/>
						<GeneralCustomerTable
							data={data.rows}
							state={state}
							setState={setState}
							type={type}
						/>
						<GeneralCustomerTable data={data.totals} tableFooter={true} />
					</Table>
				)}
				<div className="d-flex justify-content-end mt-5">
					<BackButton state={state} setState={setState} type={type} />
				</div>
			</Container>
		);
	}
};

GeneralCustomerResultPage.propTypes = {
	start_date: PropTypes.string,
	finish_date: PropTypes.string,
	type: PropTypes.string,
	state: PropTypes.object,
	setState: PropTypes.func,
};

export default GeneralCustomerResultPage;
