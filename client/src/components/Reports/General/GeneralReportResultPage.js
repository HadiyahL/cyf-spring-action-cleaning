import React from "react";
import { Container } from "reactstrap";
import { Spinner, Title, BackButton } from "../../index";
import PropTypes from "prop-types";
import useFetch from "../../../hooks/useFetch";
import GeneralReportByCleaner from "./GeneralReportByCleaner";
import GeneralReportByCustomer from "./GeneralReportByCustomer";

const GeneralReportResultPage = ({ state, setState }) => {
	const { start_date, finish_date, byCustomer } = state;

	const { data, error, isLoading } = useFetch(
		`/general_reports/general/${start_date}/${finish_date}`
	);

	if (error) {
		return <div>Error</div>;
	} else if (isLoading) {
		return <Spinner />;
	} else {
		return (
			<Container>
				<Title text="General report" />
				<h3 className="text-center mt-4 mt-md-5 mb-5 mb-md-5">
					Work duration from {start_date} to {finish_date}
				</h3>
				{data.generalData.length === 0 ? (
					<p>No data for this period.</p>
				) : byCustomer ? (
					<GeneralReportByCustomer
						state={state}
						setState={setState}
						data={data}
					/>
				) : (
					<GeneralReportByCleaner
						state={state}
						setState={setState}
						data={data}
					/>
				)}
				<div className="d-flex justify-content-end mt-5">
					<BackButton state={state} setState={setState} />
				</div>
			</Container>
		);
	}
};

GeneralReportResultPage.propTypes = {
	state: PropTypes.object,
	setState: PropTypes.func,
};

export default GeneralReportResultPage;
