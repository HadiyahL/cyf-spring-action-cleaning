import React from "react";
import PropTypes from "prop-types";
import { Label, Input, FormGroup } from "reactstrap";

const GroupByDropdown = ({ state, setState }) => {
	const handleChange = (e) => {
		const { value } = e.target;

		setState({
			...state,
			groupBy: value,
		});
	};

	return (
		<FormGroup className="mb-5">
			<Label for="groupBySelect" size="lg">
				Group By
			</Label>
			<Input
				type="select"
				name="groupBySelect"
				id="groupBySelect"
				onChange={handleChange}
				value={state.groupBy}
			>
				<option value="customer">Customer</option>
				<option value="worker">Cleaner</option>
				<option value="date">Date</option>
			</Input>
		</FormGroup>
	);
};

GroupByDropdown.propTypes = {
	state: PropTypes.object,
	setState: PropTypes.func,
};

export default GroupByDropdown;
