import React from "react";
import { Container } from "reactstrap";
import { Spinner, Title, BackButton } from "../../index";
import PropTypes from "prop-types";
import useFetch from "../../../hooks/useFetch";
import GeneralReportByDate from "./GeneralReportByDate";
import GeneralReportByCustomer from "./GeneralReportByCustomer";
import GeneralReportByWorker from "./GeneralReportByWorker";

const GeneralReportResultPage = ({ state, setState }) => {
	const { start_date, finish_date, groupBy } = state;
	const { data, error, isLoading } = useFetch(
		`/general_reports/general/${start_date}/${finish_date}`
	);

	let generalReportComponent;
	if (error) {
		return <div>Error</div>;
	} else if (isLoading) {
		return <Spinner />;
	} else {
		if (groupBy === "customer") {
			generalReportComponent = (
				<GeneralReportByCustomer
					state={state}
					setState={setState}
					data={data}
				/>
			);
		}
		if (groupBy === "worker") {
			generalReportComponent = (
				<GeneralReportByWorker state={state} setState={setState} data={data} />
			);
		}
		if (groupBy === "date") {
			generalReportComponent = (
				<GeneralReportByDate state={state} setState={setState} data={data} />
			);
		}
	}

	return (
		<Container>
			<Title
				text={`General report by ${groupBy === "worker" ? "cleaner" : groupBy}`}
			/>
			<h3 className="text-center mt-4 mt-md-5 mb-5 mb-md-5">
				Work duration from {start_date} to {finish_date}
			</h3>
			{data.generalData.length === 0 ? (
				<p>No data for this period.</p>
			) : (
				generalReportComponent
			)}
			<div className="d-flex justify-content-end mt-5">
				<BackButton state={state} setState={setState} />
			</div>
		</Container>
	);
};

GeneralReportResultPage.propTypes = {
	state: PropTypes.object,
	setState: PropTypes.func,
};

export default GeneralReportResultPage;
