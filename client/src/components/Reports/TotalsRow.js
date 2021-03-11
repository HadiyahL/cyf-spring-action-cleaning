import React from "react";
import PropTypes from "prop-types";

const TotalsRow = ({ data, detailed, forResultTable }) => {
	const [{ contracted_duration, actual_duration }] = data;

	return (
		<tbody>
			<tr>
				{forResultTable && <td></td>}
				{detailed && <td></td>}
				<th scope="row" className="font-weight-bold text-right">
					Total duration:
				</th>
				<td className="font-weight-bold">{contracted_duration}</td>
				<td className="font-weight-bold">{actual_duration}</td>
				{detailed && <td></td>}
			</tr>
		</tbody>
	);
};

TotalsRow.propTypes = {
	data: PropTypes.array,
	detailed: PropTypes.bool,
	forResultTable: PropTypes.bool,
};

export default TotalsRow;
