import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { formatDate } from "../../util/helpers";

const GeneralTable = ({ data, state, setState, tableFooter }) => {
	const history = useHistory();

	const formatDuration = (h = 0, m = 0) => {
		const hours = ("00" + Math.abs(h)).slice(-2);
		const minutes = ("00" + Math.abs(m)).slice(-2);

		return `${h < 0 || m < 0 ? "-" : " "}${hours}:${minutes}`;
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
							{contracted_duration}
						</td>
						<td className={tableFooter && "font-weight-bold"}>
							{actual_duration}
						</td>
						<td className={tableFooter && "font-weight-bold"}>
							{formatDuration(difference.hours, difference.minutes)}
						</td>
						<td className={tableFooter && "font-weight-bold"}>{feedback}</td>
					</tr>
				)
			)}
		</tbody>
	);
};

GeneralTable.propTypes = {
	data: PropTypes.array,
	tableFooter: PropTypes.bool,
	state: PropTypes.object,
	setState: PropTypes.func,
};

export default GeneralTable;
