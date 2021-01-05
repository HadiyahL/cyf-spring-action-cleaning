import React from "react";
import PropTypes from "prop-types";
import { FormGroup, Label, Input, FormText, Button } from "reactstrap";

const SelectStartTime = ({ state, setState, error }) => {
	const handleChange = (e) => {
		setState({
			...state,
			start_time: e.target.value,
		});
	};

	const handleResetTime = () => {
		setState({
			...state,
			start_time: "",
		});
	};

	return (
		<div className="mb-3 mb-md-4 mb-lg-5">
			<FormGroup>
				<Label for="time" size="lg">
					Start time <span className="text-muted">(optional)</span>{" "}
				</Label>
				<Input
					invalid={!!error}
					type="time"
					name="time"
					id="time"
					value={state.start_time}
					onChange={handleChange}
					placeholder="HH:MM (24h clock)"
					pattern="^([0-1]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$"
				/>
				<FormText>
					<Button color="link" size="sm" onClick={handleResetTime}>
						Reset
					</Button>
				</FormText>
				{error && <FormText color="danger">{error}</FormText>}
			</FormGroup>
		</div>
	);
};

SelectStartTime.propTypes = {
	state: PropTypes.object.isRequired,
	setState: PropTypes.func.isRequired,
	error: PropTypes.string,
};

export default SelectStartTime;
