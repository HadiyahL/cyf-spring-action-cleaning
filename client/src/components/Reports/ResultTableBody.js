import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { formatDate } from "../../util/helpers";


const ResultTableBody = ({ data, detailed, tableFooter }) => {

	const history = useHistory();

	const formatDuration = (h = 0, m = 0) => {
		return ("00" + h).slice(-2) + ":" + ("00" + m).slice(-2);
	};

	const handleClick = (id) => {
		history.push(`/edit-jobs/${id}`);
	};

	const handleKeyPress = (id, e) => {
		if (e.key === "Enter" && e.target.tagName === "TR") {
			history.push(`/edit-jobs/${id}`);
		}
	};

	if (detailed){
		return (
			<tbody>
				{data.map(({
					id,
					visit_on,
					column_1,
					column_2,
					duration
				}) => (
					<tr
						key={id}
						role="button"
						onClick={() => handleClick(id)}
						onKeyPress={(e) => handleKeyPress(id, e)}
						tabIndex={0}
					>
						<th scope="row">{visit_on ? formatDate(visit_on, {
							year: "numeric",
							month: "numeric",
							day: "numeric",
						}):""}</th>
						<td>{column_1}</td>
						<td className={tableFooter && "font-weight-bold text-right"}>
							{tableFooter ? "Total duration:" : column_2}
						</td>
						<td className={tableFooter && "font-weight-bold"}>
							{formatDuration(duration.hours, duration.minutes)}
						</td>
					</tr>
				))}
			</tbody>
		);
	} else {
		return (
			<tbody>
				{data.map(({column_1, column_2, duration}, ind) => (
					<tr key={ind}>
						<th scope="row">{column_1}</th>
						<td className={tableFooter && "font-weight-bold text-right"}>
							{tableFooter ? "Total duration:" : column_2}
						</td>
						<td className={tableFooter && "font-weight-bold"}>
							{formatDuration(duration.hours, duration.minutes)}
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
