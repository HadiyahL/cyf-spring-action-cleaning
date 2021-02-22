import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { BranchReportContext } from "../contexts/BranchReport";
import GeneralBranchResultPage from "../components/Reports/GeneralBranchResultPage";

const GeneralBranchReport = () => {
	const [state, setState] = useContext(BranchReportContext);
	const { customer_id, start_date, finish_date } = state;

	if (start_date && customer_id) {
		return (
			<GeneralBranchResultPage
				start_date={start_date}
				finish_date={finish_date}
				state={state}
				setState={setState}
			/>
		);
	} else {
		return <Redirect to={"/branches_report"} />; // Go to <CreateBranchReport>
	}
};
export default GeneralBranchReport;
