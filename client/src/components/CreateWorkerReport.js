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
		history.push(
			"/result/worker"
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
			<div className="d-flex justify-content-end">
				<Button>Run</Button>
			</div>
		</Form>
	);
};

export default CreateWorkerReport;
