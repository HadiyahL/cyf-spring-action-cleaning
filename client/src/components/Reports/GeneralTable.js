import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

const GeneralTable = ({ data, tableFooter, showFeedback, showComment }) => {
	const history = useHistory();

	const handleClick = (id) => {
		history.push(`/edit-jobs/${id}`);
	};

	const handleKeyPress = (id, e) => {
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
					comment,
				}) => (
					<tr
						key={id || 0} //In the case of displaying the final line, use 0 for the key and prohibit actions.
						role={id && "button"}
						onClick={() => id && handleClick(id)}
						onKeyPress={(e) => id && handleKeyPress(id, e)}
						tabIndex={id && 0}
					>
						<td>{customer}</td>
						<td>{branch}</td>
						<td>{tableFooter ? "" : visit_on}</td>
						<td className={tableFooter && "font-weight-bold"}>
							{tableFooter ? "Totals:" : worker}
						</td>
						<td className={tableFooter && "font-weight-bold"}>
							{contracted_duration}
						</td>
						<td className={tableFooter && "font-weight-bold"}>
							{actual_duration}
						</td>
						<td className={tableFooter && "font-weight-bold"}>{difference}</td>
						{showComment && <td className="comment-width">{comment}</td>}
						{showFeedback && <td className="comment-width">{feedback}</td>}
					</tr>
				)
			)}
		</tbody>
	);
};

GeneralTable.propTypes = {
	data: PropTypes.array,
	tableFooter: PropTypes.bool,
	showFeedback: PropTypes.bool,
	showComment: PropTypes.bool,
};

export default GeneralTable;
