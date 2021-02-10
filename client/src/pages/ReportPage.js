import React, { useContext } from "react";
import { useParams, Redirect } from "react-router-dom";
import { WorkerReportContext } from "../contexts/WorkerReport";
import { CustomerReportContext } from "../contexts/CustomerReport";
import ResultPage from "../components/Reports/ResultPage";

const ReportPage = () => {
	const { type } = useParams();
	const [state] = useContext(
		[CustomerReportContext, WorkerReportContext][Number(type === "worker")]
	);
	const { start_date, finish_date, detailed } = state;
	const name = [state.customer, state.worker][Number(type === "worker")];
	const id = [state.customer_id, state.worker_id][Number(type === "worker")];

	if (id) {
		return (
			<ResultPage
				start_date={start_date}
				finish_date={finish_date}
				detailed={detailed}
				name={name}
				id={id}
				type={type}
			/>
		);
	} else {
		return <Redirect to={`/${type}s_report`} />;
	}
};

export default ReportPage;
