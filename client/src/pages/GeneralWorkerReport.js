import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { WorkerReportContext } from "../contexts/WorkerReport";
import GeneralWorkerResultPage from "../components/Reports/GeneralWorkerResultPage";

const GeneralWorkerReport = () => {
	const [state, setState] = useContext(WorkerReportContext);
	const { start_date, finish_date } = state;

  if (start_date){
    return(
      <GeneralWorkerResultPage start_date={start_date} finish_date={finish_date} state={state} setState={setState} />
    )

  } else {
    return <Redirect to={"/workers_report"} />;
  }


};

export default GeneralWorkerReport;
