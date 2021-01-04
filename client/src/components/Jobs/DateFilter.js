import React from "react";
import PropTypes from "prop-types";
import { FormGroup, Label, Input } from "reactstrap";

const DateFilter = ({ state, setState }) => {
	const handleDateChange = (e) => {
		setState({
			...state,
			[e.target.name]: e.target.value,
		});
	};

	const { start_time, end_time } = state;

	return (
		<div className="mb-1">
			<FormGroup className="d-inline-block">
				<Label htmlFor="start_time" className="mr-3 d-flex">
					<div className="align-self-center">From: </div>
					<Input
						type="date"
						id="start_time"
						name="start_time"
						value={start_time}
						onChange={handleDateChange}
						className="ml-1"
					/>
				</Label>
			</FormGroup>
			<FormGroup className="d-inline-block">
				<Label htmlFor="end_time" className="d-flex">
					<div className="align-self-center">To: </div>
					<Input
						type="date"
						id="end_time"
						name="end_time"
						value={end_time}
						onChange={handleDateChange}
						className="ml-1"
					/>
				</Label>
			</FormGroup>
		</div>
	);
};

DateFilter.propTypes = {
	state: PropTypes.object.isRequired,
	setState: PropTypes.func.isRequired,
};

export default DateFilter;
