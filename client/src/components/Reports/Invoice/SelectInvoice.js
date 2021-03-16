import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { Form, Button, Input, Label } from "reactstrap";
import { SelectCustomer } from "../..";
import SelectDateU from "../SelectDateU";
import { InvoiceContext } from "../../../contexts/Invoice";

const SelectInvoice = () => {
	const [state, setState] = useContext(InvoiceContext);
	const [error, setError] = useState(null);
	const history = useHistory();

	const handleSubmit = (e) => {
		e.preventDefault();
		if (state.customer_id) {
			setError(null);
			history.push("/invoice"); // Go to <Invoice />
		} else {
			setError("Please select a customer");
		}
	};

	const handleChange = (e) => {
		const { name, checked, type } = e.target;
		if (type === "checkbox") {
			setState({ ...state, [name]: checked });
		}
	};

	return (
		<Form onSubmit={handleSubmit}>
			<SelectCustomer
				state={state}
				setState={setState}
				error={error}
				setError={setError}
			/>
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

export default SelectInvoice;
