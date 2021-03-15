import React from "react";
import PropTypes from "prop-types";

const DataRowShort = ({
	data: { branch, visit_on, contracted_duration },
	firstRow,
}) => {
	return (
		<tr>
			<td>{firstRow && branch}</td>
			<td>{visit_on}</td>
			<td>{contracted_duration}</td>
			<td></td>
			<td></td>
			<td></td>
		</tr>
	);
};

DataRowShort.propTypes = {
	data: PropTypes.object,
	firstRow: PropTypes.bool,
};

export default DataRowShort;
