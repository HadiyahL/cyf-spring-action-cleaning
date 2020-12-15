import React from "react";
import PropTypes from "prop-types";
import { FormGroup, Label, Input, FormText } from "reactstrap";

const SelectTime = ({ state, setState, error }) => {
	const handleChange = (e) => {
		setState({
			...state,
			visit_time: e.target.value,
		});
	};

	return (
		<div className="mb-3 mb-md-4 mb-lg-5">
			<FormGroup>
				<Label for="time" size="lg">
					Visit time
				</Label>
				<Input
					invalid={!!error}
					type="time"
					name="time"
					id="time"
					value={state.visit_time || ""}
					onChange={handleChange}
					placeholder="HH:MM (24h clock)"
					pattern="^([0-1]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$"
					required
				/>
				{error && <FormText color="danger">{error}</FormText>}
			</FormGroup>
		</div>
	);
};

SelectTime.propTypes = {
	state: PropTypes.object.isRequired,
	setState: PropTypes.func.isRequired,
	error: PropTypes.string,
};

export default SelectTime;
