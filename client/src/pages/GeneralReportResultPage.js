import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { GeneralReportContext } from "../contexts/GeneralReport";
import GeneralReportResultPage from "../components/Reports/General/GeneralReportResultPage";

const GeneralReportResult = () => {
	const [state, setState] = useContext(GeneralReportContext);
	const { start_date } = state;

	if (start_date) {
		return <GeneralReportResultPage state={state} setState={setState} />;
	} else {
		return <Redirect to={"/general_report"} />; // Go to <GeneralReportPage>
	}
};

export default GeneralReportResult;
