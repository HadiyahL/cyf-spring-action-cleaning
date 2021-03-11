import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { WorkerReportContext } from "../contexts/WorkerReport";
import { GeneralWorkerResultPage } from "../components";

const GeneralWorkerReport = () => {
	const [state, setState] = useContext(WorkerReportContext);
	const { start_date, finish_date } = state;

	if (start_date) {
		return (
			<GeneralWorkerResultPage
				start_date={start_date}
				finish_date={finish_date}
				state={state}
				setState={setState}
			/>
		);
	} else {
		return <Redirect to={"/workers_report"} />; // Go to <WorkerReports>
	}
};

export default GeneralWorkerReport;
