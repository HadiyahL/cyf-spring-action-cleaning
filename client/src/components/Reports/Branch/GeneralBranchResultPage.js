import React from "react";
import { Container, Table } from "reactstrap";
import { Spinner, Title, BackButton } from "../../index";
import PropTypes from "prop-types";
import useFetch from "../../../hooks/useFetch";
import ResultTableHead from "../ResultTableHead";
import GeneralBranchTable from "./GeneralBranchTable";
import TotalsRow from "../TotalsRow";
import { transformDate } from "../../../util/helpers";

const GeneralBranchResultPage = ({
	start_date,
	finish_date,
	state,
	setState,
}) => {
	const { data, error, isLoading } = useFetch(
		`/general_reports/branch/${state.customer_id}/${start_date}/${finish_date}`
	);

	if (error) {
		return <div>Error</div>;
	} else if (isLoading) {
		return <Spinner />;
	} else if (data) {
		return (
			<Container>
				<Title text={`General report of ${state.customer} addresses`} />
				<h3 className="text-center mt-4 mt-md-5 mb-5 mb-md-5">
					Work duration from {transformDate(start_date)} to{" "}
					{transformDate(finish_date)}
				</h3>
				{data.rows.length < 1 ? (
					<p>No data for this period.</p>
				) : (
					<Table striped hover responsive>
						<ResultTableHead
							labels={["Address", "Planned duration", "Actual duration"]}
							detailed={false}
						/>
						<GeneralBranchTable
							data={data.rows}
							state={state}
							setState={setState}
						/>
						<TotalsRow data={data.totals} />
					</Table>
				)}
				<div className="d-flex justify-content-end mt-5">
					<BackButton state={state} setState={setState} />
				</div>
			</Container>
		);
	}
};

GeneralBranchResultPage.propTypes = {
	start_date: PropTypes.string,
	finish_date: PropTypes.string,
	state: PropTypes.object,
	setState: PropTypes.func,
};

export default GeneralBranchResultPage;
