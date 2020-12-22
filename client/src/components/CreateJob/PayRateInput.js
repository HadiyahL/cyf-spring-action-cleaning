import React from "react";
import PropTypes from "prop-types";
import { FormGroup, Label, Input, FormText } from "reactstrap";

const PayRateInput = ({ state, setState, error }) => {
	const handleChange = (e) => {
		setState({
			...state,
			pay_rate: e.target.value === "" ? undefined : e.target.value,
		});
	};

	return (
		<div className="mb-3 mb-md-4 mb-lg-5">
			<FormGroup>
				<Label for="payRate" size="lg">
          Pay rate
				</Label>
				<Input
					invalid={!!error}
					type="text"
					name="payRate"
					id="payRate"
					placeholder="10.50 or 10"
					value={state.pay_rate}
					pattern="^\d+(\.\d+)?$"
					onChange={handleChange}
				/>
				{error && <FormText color="danger">{error}</FormText>}
			</FormGroup>
		</div>
	);
};

PayRateInput.propTypes = {
	state: PropTypes.object.isRequired,
	setState: PropTypes.func.isRequired,
	error: PropTypes.string,
};

export default PayRateInput;
