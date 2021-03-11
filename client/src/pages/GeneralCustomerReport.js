import React, { useContext } from "react";
import { useParams, Redirect } from "react-router-dom";
import { CustomerReportContext } from "../contexts/CustomerReport";
import { BranchReportContext } from "../contexts/BranchReport";
import GeneralCustomerResultPage from "../components/Reports/Customer/GeneralCustomerResultPage";

const GeneralCustomerReport = () => {
	const { type } = useParams();
	const [state, setState] = useContext(
		type === "customer" ? CustomerReportContext : BranchReportContext
	);
	const { start_date, finish_date } = state;

	if (start_date) {
		return (
			<GeneralCustomerResultPage
				start_date={start_date}
				finish_date={finish_date}
				state={state}
				setState={setState}
				type={type}
			/>
		);
	} else {
		if (type === "customer") {
			return <Redirect to={"/customers_report"} />; // Go to <CustomerReports>
		} else {
			return <Redirect to={"/customers_report"} />; // Go to <CustomerReports>
		}
	}
};
export default GeneralCustomerReport;
