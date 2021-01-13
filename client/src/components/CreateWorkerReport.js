import React, { useContext } from "react";
import { Form, Button } from "reactstrap";
import { useHistory } from "react-router-dom";
import { SelectDateU, SelectWorker } from "../components";
import { WorkerReportContext } from "../contexts/WorkerReport";

const CreateWorkerReport = () => {
	const [state, setState] = useContext(WorkerReportContext);
	const history = useHistory();

	const handleSubmit = (e) => {
		e.preventDefault();

		const { worker_id, worker, start_date, finish_date } = state;

		history.push(
			`/result/${worker_id}/${start_date}/${finish_date}/${worker}/worker`
		);
	};

	return (
		<Form onSubmit={handleSubmit}>
			<SelectWorker state={state} setState={setState} />
			<SelectDateU
				state={state}
				setState={setState}
				dateAttribute="start_date"
				attributeTitle="Start date"
			/>
			<SelectDateU
				state={state}
				setState={setState}
				dateAttribute="finish_date"
				attributeTitle="Finish date"
			/>
			<Button>Run</Button>
		</Form>
	);
};

export default CreateWorkerReport;
