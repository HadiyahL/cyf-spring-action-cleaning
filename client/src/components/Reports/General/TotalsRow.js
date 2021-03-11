import React from "react";
import PropTypes from "prop-types";

const TotalsRow = ({ showComment, data, title = "Total" }) => (
	<tr className="dark-row">
		<td></td>
		<td></td>
		<td></td>
		<td className="font-weight-bold">{title}</td>
		<td className="font-weight-bold">{data.contracted_duration}</td>
		<td className="font-weight-bold">{data.actual_duration}</td>
		<td className="font-weight-bold">{data.difference}</td>
		{showComment && <td className="comment-width"></td>}
	</tr>
);

TotalsRow.propTypes = {
	showComment: PropTypes.bool,
	data: PropTypes.object,
	title: PropTypes.string,
};

export default TotalsRow;
