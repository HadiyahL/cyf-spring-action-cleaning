import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Form, Button, Label, Input } from "reactstrap";
import { SelectCustomer } from "..";
import SelectDateU from "./SelectDateU";
import { CustomerReportContext } from "../../contexts/CustomerReport";

const CreateCustomerReport = () => {
	const [state, setState] = useContext(CustomerReportContext);
	const history = useHistory();

	const handleSubmit = (e) => {
		e.preventDefault();
		if (state.customer_id) {
			history.push("/result/customer"); // Go to <ReportPage>
		} else {
			history.push("/general_customer"); // Go to <GeneralCustomerReport>
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
			<SelectCustomer state={state} setState={setState} forReport={true} />
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

export default CreateCustomerReport;
