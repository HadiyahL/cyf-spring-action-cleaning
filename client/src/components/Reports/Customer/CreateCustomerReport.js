import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Form, Button, Label, Input } from "reactstrap";
import { SelectCustomer } from "../..";
import SelectDateU from "../SelectDateU";
import { CustomerReportContext } from "../../../contexts/CustomerReport";

const CreateCustomerReport = () => {
	const [state, setState] = useContext(CustomerReportContext);
	const history = useHistory();

	const handleSubmit = (e) => {
		e.preventDefault();
		if (state.customer_id) {
			history.push("/result/customer"); // Go to <ReportPage>
		} else {
			history.push("/general_customer/customer"); // Go to <GeneralCustomerReport>
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

export default CreateCustomerReport;
