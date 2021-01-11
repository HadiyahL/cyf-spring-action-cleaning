import React from "react";
import PropTypes from "prop-types";
import { FormGroup, Label, Input, FormText } from "reactstrap";

const SelectDuration = ({ state, setState, error }) => {
	const handleChange = (e) => {
		setState({
			...state,
			duration: e.target.value,
		});
	};

	return (
		<div className="mb-3 mb-md-4 mb-lg-5 w-100 mr-3 mr-md-5">
			<FormGroup>
				<Label for="duration" size="lg">
					Duration <span className="text-muted">(optional)</span>
				</Label>
				<Input
					invalid={!!error}
					type="select"
					name="select"
					id="duration"
					onChange={handleChange}
					value={state.duration || "1"}
				>
					<option value="1">1 hour</option>
					<option value="2">2 hours</option>
					<option value="3">3 hours</option>
					<option value="4">4 hours</option>
					<option value="5">5 hours</option>
					<option value="6">6 hours</option>
					<option value="7">7 hours</option>
					<option value="8">8 hours</option>
					<option value="9">9 hours</option>
					<option value="10">10 hours</option>
				</Input>
				{error && <FormText color="danger">{error}</FormText>}
			</FormGroup>
		</div>
	);
};

SelectDuration.propTypes = {
	state: PropTypes.object.isRequired,
	setState: PropTypes.func.isRequired,
	error: PropTypes.string,
};

export default SelectDuration;
