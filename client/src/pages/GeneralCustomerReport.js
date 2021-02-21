import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { CustomerReportContext } from "../contexts/CustomerReport";
import GeneralCustomerResultPage from "../components/Reports/GeneralCustomerResultPage";

const GeneralCustomerReport = () => {
	const [state, setState] = useContext(CustomerReportContext);
	const { start_date, finish_date } = state;

	if (start_date) {
		return (
			<GeneralCustomerResultPage
				start_date={start_date}
				finish_date={finish_date}
				state={state}
				setState={setState}
			/>
		);
	} else {
		return <Redirect to={"/customers_report"} />; // Go to <CustomerReports>
	}
};
export default GeneralCustomerReport;
