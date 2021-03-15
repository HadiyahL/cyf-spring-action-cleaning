import React from "react";
import PropTypes from "prop-types";

const DataRow = ({
	data: {
		actual_duration,
		branch,
		visit_on,
		worker,
		contracted_duration,
		difference,
		comment,
	},
}) => {
	return (
		<tr>
			<td>{branch}</td>
			<td>{visit_on}</td>
			<td>{worker}</td>
			<td>{contracted_duration}</td>
			<td>{actual_duration}</td>
			<td>{difference}</td>
			<td className="comment-width">{comment}</td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
		</tr>
	);
};

DataRow.propTypes = {
	data: PropTypes.object,
};

export default DataRow;
