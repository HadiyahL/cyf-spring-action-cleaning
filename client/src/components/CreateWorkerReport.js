import React, { useState } from "react";
import PropTypes from "prop-types";
import { SelectDateU, SelectWorker } from "../components";
import { Form, Button } from "reactstrap";
import { useHistory } from "react-router-dom";

const CreateWorkerReport = ({ worker, worker_id, start_date, finish_date }) => {
	const history = useHistory();
	const date = new Date(), y = date.getFullYear(), m = date.getMonth();
	const firstDay = new Date(y, m, 1);
	const lastDay = new Date(y, m + 1, 0);

	const [state, setState] = useState({

		worker: worker || "",
		worker_id: worker_id || "",
		start_date: start_date || firstDay,
		finish_date: finish_date || lastDay,

	});


	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(state);
		history.push(`/result/${state.worker_id}/${state.start_date}/${state.finish_date}/${state.worker}/worker`);

	};

	return (

		<Form onSubmit={handleSubmit}>
			<SelectWorker state={state} setState={setState}  />
			<SelectDateU state={state} setState={setState}  dateAttribute="start_date" attributeTitle="Start date" />
			<SelectDateU state={state} setState={setState}   dateAttribute="finish_date" attributeTitle="Finish date" />
			<Button color="primary" size="lg">
				Run
			</Button>
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