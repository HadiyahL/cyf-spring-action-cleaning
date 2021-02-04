import React, { useContext } from "react";
import { SelectDateU, SelectCustomer } from "../components";
import { Form, Button } from "reactstrap";
import { useHistory } from "react-router-dom";
import { CustomerReportContext } from "../contexts/CustomerReport";

const CreateCustomerReport = () => {
	const [state, setState] = useContext(CustomerReportContext);
	const history = useHistory();

	const handleSubmit = (e) => {
		e.preventDefault();
		history.push(
			"/result/customer"
		);
	};

	return (
		<Form onSubmit={handleSubmit}>
			<SelectCustomer state={state} setState={setState} />
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

export default CreateCustomerReport;
