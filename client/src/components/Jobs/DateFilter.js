import React from "react";
import PropTypes from "prop-types";

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
			<label htmlFor="start_time" className="mr-3">
				<div className="time-input-label">From: </div>
				<input
					type="date"
					id="start_time"
					name="start_time"
					value={start_time}
					onChange={handleDateChange}
					className="ml-1"
				/>
			</label>
			<label htmlFor="end_time" className="ml-sm-4">
				<div className="time-input-label">To: </div>
				<input
					type="date"
					id="end_time"
					name="end_time"
					value={end_time}
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
