import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { formatDate } from "../../util/helpers";

const GeneralTable = ({ data, tableFooter }) => {
	const history = useHistory();

	const formatDuration = ({ hours = 0, minutes = 0 }) => {
		const h = Math.abs(hours).toString().padStart(2, "0");
		const m = Math.abs(minutes).toString().padStart(2, "0");

		return `${hours < 0 || minutes < 0 ? "-" : " "}${h}:${m}`;
	};

	const handleClick = (id) => {
		history.push(`/edit-jobs/${id}`);
	};

	const handleKeyPress = (id, customer, e) => {
		if (e.key === "Enter" && e.target.tagName === "TR") {
			history.push(`/edit-jobs/${id}`);
		}
	};

	return (
		<tbody>
			{data.map(
				({
					id,
					actual_duration,
					customer,
					branch,
					visit_on,
					worker,
					contracted_duration,
					feedback,
					difference,
				}) => (
					<tr
						key={id || 0} //In the case of displaying the final line, use 0 for the key and prohibit actions.
						role={id && "button"}
						onClick={() => id && handleClick(id)}
						onKeyPress={(e) => id && handleKeyPress(id, e)}
						tabIndex={id && 0}
					>
						<td className={tableFooter && "font-weight-bold text-right"}>
							{customer}
						</td>
						<td className={tableFooter && "font-weight-bold"}>{branch}</td>
						<td className={tableFooter && "font-weight-bold"}>
							{tableFooter
								? ""
								: formatDate(visit_on, {
										year: "numeric",
										month: "numeric",
										day: "numeric",
								  })}
						</td>
						<td className={tableFooter && "font-weight-bold"}>
							{tableFooter ? "Totals:" : worker}
						</td>
						<td className={tableFooter && "font-weight-bold"}>
							{formatDuration(contracted_duration)}
						</td>
						<td className={tableFooter && "font-weight-bold"}>
							{formatDuration(actual_duration)}
						</td>
						<td className={tableFooter && "font-weight-bold"}>
							{formatDuration(difference)}
						</td>
						<td
							className={
								tableFooter ? "font-weight-bold comment-width" : "comment-width"
							}
						>
							{feedback}
						</td>
					</tr>
				)
			)}
		</tbody>
	);
};

GeneralTable.propTypes = {
	data: PropTypes.array,
	tableFooter: PropTypes.bool,
};

export default GeneralTable;
