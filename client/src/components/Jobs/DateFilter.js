import React from "react";
import PropTypes from "prop-types";

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
			<label htmlFor="startDate" className="mr-3">
				<div className="time-input-label">From: </div>
				<input
					type="date"
					id="startDate"
					name="startDate"
					value={startDate}
					onChange={handleDateChange}
					className="ml-1"
				/>
			</label>
			<label htmlFor="endDate" className="ml-sm-4">
				<div className="time-input-label">To: </div>
				<input
					type="date"
					id="endDate"
					name="endDate"
					value={endDate}
					onChange={handleDateChange}
					className="ml-1"
				/>
			</label>
		</div>
	);
};

DateFilter.propTypes = {
	state: PropTypes.object.isRequired,
	setState: PropTypes.func.isRequired,
};

export default DateFilter;
