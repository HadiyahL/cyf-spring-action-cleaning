import React from "react";
import PropTypes from "prop-types";

const ResultTableBody = ({ data, bold, type }) => {
	const formatDate = (h = 0, m = 0) => {
		return ("00" + h).slice(-2) + ":" + ("00" + m).slice(-2);
	};

	return (
		<tbody>
			{data.rows.map(({ name, address, duration }, ind) => (
				<tr key={ind}>
					<th scope="row">{type === "worker" ? name : address}</th>
					<td className={bold}>
						{bold ? "Total duration:" : type === "worker" ? address : name}
					</td>
					<td className={bold + "Time"}>
						{formatDate(duration.hours, duration.minutes)}
					</td>
				</tr>
			))}
		</tbody>
	);
};

ResultTableBody.propTypes = {
	data: PropTypes.object,
	bold: PropTypes.string,
	type: PropTypes.string,
};
export default ResultTableBody;
