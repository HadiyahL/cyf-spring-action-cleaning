import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { BranchReportContext } from "../contexts/BranchReport";
import BranchResultPage from "../components/Reports/BranchResultPage";

const BranchReportPage = () => {
	const [state] = useContext(BranchReportContext);

	if (state.branch_id) {
		return <BranchResultPage state={state} />;
	} else {
		return <Redirect to={"/branches_report"} />;
	}
};

export default BranchReportPage;
