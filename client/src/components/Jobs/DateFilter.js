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

	const { startDate, endDate } = state;

	return (
		<div className="mb-1">
			<FormGroup className="d-inline-block">
				<Label htmlFor="startDate" className="mr-3 d-flex">
					<div className="align-self-center text-right date-input-label">
						From:{" "}
					</div>
					<Input
						type="date"
						id="startDate"
						name="startDate"
						value={startDate}
						onChange={handleDateChange}
						className="ml-1"
					/>
				</Label>
			</FormGroup>
			<FormGroup className="d-inline-block">
				<Label htmlFor="endDate" className="d-flex">
					<div className="align-self-center text-right date-input-label">
						To:{" "}
					</div>
					<Input
						type="date"
						id="endDate"
						name="endDate"
						value={endDate}
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
