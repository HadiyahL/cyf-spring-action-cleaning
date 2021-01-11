import React from "react";
import PropTypes from "prop-types";
import { FormGroup, Label, Input, FormText } from "reactstrap";

const SelectDate = ({ state, setState, error }) => {
	const handleChange = (e) => {
		setState({
			...state,
			visit_on: e.target.value,
		});
	};

	return (
		<div className="mb-3 mb-md-4 mb-lg-5 w-100 mr-3 mr-md-5">
			<FormGroup>
				<Label for="date" size="lg">
					Date
				</Label>
				<Input
					invalid={!!error}
					type="date"
					name="date"
					id="date"
					value={state.visit_on}
					onChange={handleChange}
					placeholder="DD-MM-YYYY"
					required
				/>
				{error && <FormText color="danger">{error}</FormText>}
			</FormGroup>
		</div>
	);
};

SelectDate.propTypes = {
	state: PropTypes.object.isRequired,
	setState: PropTypes.func.isRequired,
	error: PropTypes.string,
};

export default SelectDate;
