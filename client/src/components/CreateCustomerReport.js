import React, { useState } from "react";
import PropTypes from "prop-types";
import { SelectDateU, SelectCustomer } from "../components";
import { Form, Button } from "reactstrap";
import { useHistory } from "react-router-dom";

const CreateCustomerReport = ({
	customer,
	customer_id,
	start_date,
	finish_date,
}) => {
	const history = useHistory();

	const [state, setState] = useState({
		customer: customer || "",
		customer_id: customer_id || "",
		start_date: start_date || "",
		finish_date: finish_date || "",
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		history.push(
			`/result/${state.customer_id}/${state.start_date}/${state.finish_date}/${state.customer}/customer`
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
			<Button size="lg">Run</Button>
		</Form>
	);
};
CreateCustomerReport.propTypes = {
	customer: PropTypes.string,
	customer_id: PropTypes.number,
	start_date: PropTypes.string,
	finish_date: PropTypes.string,
};
export default CreateCustomerReport;
