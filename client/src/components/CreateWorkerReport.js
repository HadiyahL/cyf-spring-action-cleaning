import React, { useState } from "react";
import PropTypes from "prop-types";
import { SelectDateU, SelectWorker } from "../components";
import { Form, Button } from "reactstrap";
import { useHistory } from "react-router-dom";

const CreateWorkerReport = ({ worker, worker_id, start_date, finish_date }) => {
	const history = useHistory();

	const [state, setState] = useState({
		worker: worker || "",
		worker_id: worker_id || "",
		start_date: start_date || "",
		finish_date: finish_date || "",
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		history.push(
			`/result/${state.worker_id}/${state.start_date}/${state.finish_date}/${state.worker}/worker`
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
CreateWorkerReport.propTypes = {
	worker: PropTypes.string,
	worker_id: PropTypes.number,
	start_date: PropTypes.string,
	finish_date: PropTypes.string,
};
export default CreateWorkerReport;
