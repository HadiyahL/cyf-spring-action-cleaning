import React from "react";
import { FormGroup, Label, Input } from "reactstrap";
import PropTypes from "prop-types";

const StatusFilter = ({ state, setState }) => {
	const handleChange = (e) => {
		const { value } = e.target;
		const status = value ? Number(value) : value;

		setState({
			...state,
			status,
		});
	};

	return (
		<FormGroup>
			<Label for="statusSelect" hidden>
				Status
			</Label>
			<Input
				type="select"
				name="statusSelect"
				id="statusSelect"
				onChange={handleChange}
				value={state.status}
				bsSize="md"
			>
				<option value="">All</option>
				<option value={1}>Completed</option>
				<option value={0}>Missing</option>
			</Input>
		</FormGroup>
	);
};

StatusFilter.propTypes = {
	state: PropTypes.object.isRequired,
	setState: PropTypes.func.isRequired,
};

export default StatusFilter;
