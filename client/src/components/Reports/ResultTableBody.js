import React from "react";
import PropTypes from "prop-types";
import { formatDate } from "../../util/helpers";

const ResultTableBody = ({ data, detailed, tableFooter }) => {
	const formatDuration = (h = 0, m = 0) => {
		return ("00" + h).slice(-2) + ":" + ("00" + m).slice(-2);
	};
	if (detailed){
		return (
			<tbody>
				{data.map((line, ind) => (
					<tr key={ind}>
						<th scope="row">{line.visit_on ? formatDate(line.visit_on, {
							year: "numeric",
							month: "numeric",
							day: "numeric",
						}):""}</th>
						<td>{line.column_1}</td>
						<td className={tableFooter && "font-weight-bold text-right"}>
							{tableFooter ? "Total duration:" : line.column_2}
						</td>
						<td className={tableFooter && "font-weight-bold"}>
							{formatDuration(line.duration.hours, line.duration.minutes)}
						</td>
					</tr>
				))}
			</tbody>
		);
	} else {
		return (
			<tbody>
				{data.map((line, ind) => (
					<tr key={ind}>
						<th scope="row">{line.column_1}</th>
						<td className={tableFooter && "font-weight-bold text-right"}>
							{tableFooter ? "Total duration:" : line.column_2}
						</td>
						<td className={tableFooter && "font-weight-bold"}>
							{formatDuration(line.duration.hours, line.duration.minutes)}
						</td>
					</tr>
				))}
			</tbody>
		);
	}
};

ResultTableBody.propTypes = {
	data: PropTypes.array,
	tableFooter: PropTypes.bool,
	detailed: PropTypes.bool,
};
export default ResultTableBody;
