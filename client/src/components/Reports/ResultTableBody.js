import React from "react";
import PropTypes from "prop-types";
import { formatDate } from "../../util/helpers";

const ResultTableBody = ({ data, bold, detailed }) => {
	const formatDuration = (h = 0, m = 0) => {
		return ("00" + h).slice(-2) + ":" + ("00" + m).slice(-2);
	};
	if (detailed){
		return (
			<tbody>
				{data.map((line, ind) => (
					<tr key={ind}>
						<th scope="row">{!!line.column_0 ? formatDate(line.column_0, {
							year: "numeric",
							month: "numeric",
							day: "numeric",
						}):""}</th>
						<td>{line.column_1}</td>
						<td className={bold}>
							{bold ? "Total duration:" : line.column_2}
						</td>
						<td className={bold + "Time"}>
							{formatDuration(line.duration.hours, line.duration.minutes)}
						</td>
					</tr>
				))}
			</tbody>
		);
	} else {
		return (
			<tbody>
				{data.rows.map((line, ind) => (
					<tr key={ind}>
						<th scope="row">{line.column_1}</th>
						<td className={bold}>
							{bold ? "Total duration:" : line.column_2}
						</td>
						<td className={bold + "Time"}>
							{formatDuration(line.duration.hours, line.duration.minutes)}
						</td>
					</tr>
				))}
			</tbody>
		);
	}
};

ResultTableBody.propTypes = {
	data: PropTypes.object,
	bold: PropTypes.string,
	detailed: PropTypes.bool,
};
export default ResultTableBody;
