import React from "react";
import PropTypes from "prop-types";

const JobsTableHead = ({ changeSearchField }) => {
	return (
		<thead>
			<tr>
				<th
					className="th-tile"
					onClick={() => changeSearchField("status")}
				></th>
				<th className="th-tile" onClick={() => changeSearchField("customer")}>
					Customer
				</th>
				<th className="th-tile" onClick={() => changeSearchField("address")}>
					Address
				</th>
				<th className="th-tile" onClick={() => changeSearchField("worker")}>
					Cleaner
				</th>
				<th
					className="th-tile cleaning-date"
					onClick={() => changeSearchField("visit_on")}
				>
					Cleaning date
				</th>
				<th
					className="th-tile th-hours-width"
					onClick={() => changeSearchField("visit_time")}
				>
					Planned start
				</th>
				<th
					className="th-tile th-hours-width"
					onClick={() => changeSearchField("visit_end")}
				>
					Planned end
				</th>
				<th
					className="th-tile th-hours-width"
					onClick={() => changeSearchField("duration")}
				>
					Planned duration
				</th>
				<th
					className="th-tile th-hours-width"
					onClick={() => changeSearchField("start_time")}
				>
					Actual start
				</th>
				<th
					className="th-tile th-hours-width"
					onClick={() => changeSearchField("end_time")}
				>
					Actual end
				</th>
				<th
					className="th-tile th-hours-width"
					onClick={() => changeSearchField("actual_duration")}
				>
					Actual duration
				</th>
				<th
					className="th-tile"
					onClick={() => changeSearchField("feedback")}
				></th>
			</tr>
		</thead>
	);
};

JobsTableHead.propTypes = {
	changeSearchField: PropTypes.func,
};

export default JobsTableHead;
