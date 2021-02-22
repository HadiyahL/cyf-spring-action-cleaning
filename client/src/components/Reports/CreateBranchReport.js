import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { Form, Button, Label, Input } from "reactstrap";
import { SelectCustomer, SelectBranch } from "..";
import SelectDateU from "./SelectDateU";
import { BranchReportContext } from "../../contexts/BranchReport";

const CreateBranchReport = () => {
	const [state, setState] = useContext(BranchReportContext);
	const history = useHistory();
	const [customerError, setCustomerError] = useState(null);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!state.customer_id) {
			setCustomerError("Please select a customer");
		} else if (state.branch_id) {
			history.push("/result_branch"); // Go to <BranchReportPage>
		} else {
			history.push("/general_branch"); // Go to <GeneralBranchReport>
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
			<SelectCustomer
				state={state}
				setState={setState}
				error={customerError}
				forBranchReport={true}
			/>
			<SelectBranch state={state} setState={setState} forReport={true} />
			<div className="d-sm-flex justify-content-between">
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
				<Label check className="d-flex align-items-center">
					<Input
						name="detailed"
						type="checkbox"
						onChange={handleChange}
						checked={state.detailed}
					/>{" "}
					Detailed
				</Label>
			</div>
			<div className="d-flex justify-content-end">
				<Button>Run</Button>
			</div>
		</Form>
	);
};

export default CreateBranchReport;
