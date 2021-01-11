import React from "react";
import PropTypes from "prop-types";
import { FormGroup, Label, Input, FormText, Button } from "reactstrap";

const SelectEndTime = ({ state, setState, error }) => {
	const handleChange = (e) => {
		setState({
			...state,
			end_time: e.target.value,
		});
	};

	const handleResetTime = () => {
		setState({
			...state,
			end_time: "",
		});
	};

	return (
		<div className="w-100 ml-3 ml-md-5">
			<FormGroup>
				<Label for="endTime" size="lg">
					End time <span className="text-muted">(optional)</span>
				</Label>
				<Input
					invalid={!!error}
					type="time"
					name="endTime"
					id="endTime"
					value={state.end_time}
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

SelectEndTime.propTypes = {
	state: PropTypes.object.isRequired,
	setState: PropTypes.func.isRequired,
	error: PropTypes.string,
};

export default SelectEndTime;
