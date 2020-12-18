import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

const JobsTableBody = ({ data }) => {
	const history = useHistory();

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

	const handleClick = (id) => {
		history.push(`/edit-jobs/${id}`);
	};

	const handleKeyPress = (id, e) => {
		if (e.key === "Enter") {
			history.push(`/edit-jobs/${id}`);
		}
	};

	return (
		<tbody>
			{data.jobs.map(
				({ id, customer, address, worker, date_created, visit_on, status }) => (
					<tr
						key={id}
						role="button"
						onClick={() => handleClick(id)}
						onKeyPress={(e) => handleKeyPress(id, e)}
						tabIndex={0}
					>
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
