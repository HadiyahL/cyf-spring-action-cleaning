import React from "react";
import PropTypes from "prop-types";

const JobsTableBody = ({ data }) => {
	const formatDate = (dateISO) => {
		const date = new Date(dateISO);
		const options = {
			// weekday: "short",
			year: "numeric",
			month: "short",
			day: "numeric",
		};

		return date.toLocaleDateString("en-GB", options);
	};

	return (
		<tbody>
			{data.jobs.map(
				({ id, customer, address, worker, date_created, visit_on, status }) => (
					<tr key={id}>
						<th scope="row">{customer}</th>
						<td>{address}</td>
						<td>{worker}</td>
						<td>{formatDate(date_created)}</td>
						<td>{formatDate(visit_on)}</td>
						<td>{status ? "Submitted" : "Not submitted"}</td>
					</tr>
				)
			)}
		</tbody>
	);
};

JobsTableBody.propTypes = {
	data: PropTypes.object,
};

export default JobsTableBody;
