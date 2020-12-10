import React from "react";
import PropTypes from "prop-types";

const JobsTableBody = ({ data }) => {
	return (
		<tbody>
			{data.jobs.map(
				({ id, customer, address, worker, date_created, visit_on, status }) => (
					<tr key={id}>
						<th scope="row">{customer}</th>
						<td>{address}</td>
						<td>{worker}</td>
						<td>{date_created}</td>
						<td>{visit_on}</td>
						<td>{status}</td>
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
