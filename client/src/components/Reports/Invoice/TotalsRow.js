import React from "react";
import PropTypes from "prop-types";

const TotalsRow = ({ data, title = "Total" }) => (
	<tr className="dark-row">
		<td></td>
		<td></td>
		<td className="font-weight-bold">{title}</td>
		<td className="font-weight-bold">{data.contracted_duration}</td>
		<td className="font-weight-bold">{data.actual_duration}</td>
		<td className="font-weight-bold">{data.difference}</td>
		<td className="font-weight-bold"></td>
		<td className="font-weight-bold"></td>
		<td className="font-weight-bold">{data.quantity.toFixed(2)}</td>
		<td className="font-weight-bold"></td>
		<td className="font-weight-bold">{data.amount.toFixed(2)}</td>
	</tr>
);

TotalsRow.propTypes = {
	data: PropTypes.object,
	title: PropTypes.string,
};

export default TotalsRow;
