import React from "react";
import PropTypes from "prop-types";
import { hoursToInt } from "../../../util/helpers";

const DataRowShort = ({
	data: { branch, visit_on, contracted_duration, unit_price },
	firstRow,
}) => {
	const quantity = hoursToInt(contracted_duration);
	const amount = quantity * unit_price;

	return (
		<tr>
			<td>{firstRow && branch}</td>
			<td>{visit_on}</td>
			<td>{contracted_duration}</td>
			<td>{quantity.toFixed(2)}</td>
			<td>{unit_price.toFixed(2)}</td>
			<td>{amount.toFixed(2)}</td>
		</tr>
	);
};

DataRowShort.propTypes = {
	data: PropTypes.object,
	firstRow: PropTypes.bool,
};

export default DataRowShort;
