import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Form, Button, Label, Input } from "reactstrap";
import SelectDateU from "../SelectDateU";
import { GeneralReportContext } from "../../../contexts/GeneralReport";

const CreateGeneralReport = () => {
	const [state, setState] = useContext(GeneralReportContext);
	const history = useHistory();

	const handleSubmit = (e) => {
		e.preventDefault();
		history.push("/general_results"); // Go to <GeneralReportResultPage>
	};

	const handleChange = (e) => {
		const { name, checked } = e.target;
		setState({ ...state, [name]: checked });
	};

	return (
		<Form onSubmit={handleSubmit}>
			<div className="d-sm-flex justify-content-between mb-5">
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
						name="byCustomer"
						type="checkbox"
						onChange={handleChange}
						checked={state.byCustomer}
						className="mb-1"
					/>
					Group by customer
				</Label>
				<Button className="align-self-sm-end">Run</Button>
			</div>
		</Form>
	);
};

export default CreateGeneralReport;
