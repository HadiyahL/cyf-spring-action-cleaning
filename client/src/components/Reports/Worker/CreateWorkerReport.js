import React, { useContext } from "react";
import { Form, Button, Label, Input } from "reactstrap";
import { useHistory } from "react-router-dom";
import { SelectWorker } from "../..";
import SelectDateU from "../SelectDateU";
import { WorkerReportContext } from "../../../contexts/WorkerReport";

const CreateWorkerReport = () => {
	const [state, setState] = useContext(WorkerReportContext);
	const history = useHistory();

	const handleSubmit = (e) => {
		e.preventDefault();
		if (state.worker_id) {
			history.push("/result/worker"); // Go to <ReportPage>
		} else {
			history.push("/general_worker"); // Go to <GeneralWorkerReport>
		}
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
		<Form onSubmit={handleSubmit}>
			<SelectWorker state={state} setState={setState} forReport={true} />
			<div className="d-sm-flex justify-content-between mb-5 mb-sm-0">
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
			<div className="d-flex justify-content-between justify-content-sm-end flex-sm-column">
				<Label
					check
					className="d-flex align-items-center user-select-none pl-4 text-right align-self-sm-end mb-sm-3 mb-md-4 mb-lg-5"
					size="lg"
				>
					<Input
						name="detailed"
						type="checkbox"
						onChange={handleChange}
						checked={state.detailed}
						className="mb-1"
					/>
					Detailed
				</Label>
				<Button className="align-self-sm-end">Run</Button>
			</div>
		</Form>
	);
};

export default CreateWorkerReport;
