import React, { useContext } from "react";
import { Container, Form, Button, Label, Input } from "reactstrap";
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

	const handleChange = (e) => {
		const { name, value, checked, type } = e.target;
		if (type === "checkbox") {
			setState({ ...state, [name]: checked });
		} else {
			setState({ ...state, [name]: value });
		}
	};

	return (
		// <Container className="mb-5">
		<Form onSubmit={handleSubmit}>
			<SelectWorker state={state} setState={setState} />
			<div className="d-flex justify-content-between">
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
			</div>
			<div className="d-flex justify-content-between">
				<Label check>
					<Input
						name="detailed"
						type="checkbox"
						onChange={handleChange}
						checked={state.detailed}
					/>{" "}
							Detailed
				</Label>

				<Button>Run</Button>
			</div>
		</Form>
		// </Container>
	);
};

export default CreateWorkerReport;
