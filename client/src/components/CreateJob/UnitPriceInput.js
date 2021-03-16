import React from "react";
import PropTypes from "prop-types";
import { FormGroup, Label, Input, FormText } from "reactstrap";

const UnitPriceInput = ({ state, setState, error }) => {
	const handleChange = (e) => {
		setState({
			...state,
			unit_price: e.target.value,
		});
	};

	return (
		<div className="mb-3 mb-md-4 mb-lg-5 w-100 ml-sm-3 ml-md-5">
			<FormGroup>
				<Label for="unitPrice" size="lg">
					Unit price (GBP)
				</Label>
				<Input
					invalid={!!error}
					type="text"
					name="unitPrice"
					id="unitPrice"
					placeholder="10.50 or 10"
					value={state.unit_price}
					pattern="^\d+(\.\d+)?$"
					onChange={handleChange}
				/>
				{error && <FormText color="danger">{error}</FormText>}
			</FormGroup>
		</div>
	);
};

UnitPriceInput.propTypes = {
	state: PropTypes.object.isRequired,
	setState: PropTypes.func.isRequired,
	error: PropTypes.string,
};

export default UnitPriceInput;
