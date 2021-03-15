import React from "react";
import PropTypes from "prop-types";

const TotalsRowShort = ({ data, title = "Total" }) => (
	<tr className="dark-row">
		<td></td>
		<td className="font-weight-bold">{title}</td>
		<td className="font-weight-bold">{data.contracted_duration}</td>
		<td className="font-weight-bold"></td>
		<td className="font-weight-bold"></td>
		<td className="font-weight-bold"></td>
	</tr>
);

TotalsRowShort.propTypes = {
	data: PropTypes.object,
	title: PropTypes.string,
};

export default TotalsRowShort;
