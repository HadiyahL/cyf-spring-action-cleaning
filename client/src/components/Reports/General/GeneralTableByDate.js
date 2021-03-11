import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

const GeneralTableByDate = ({ data, showComment }) => {
	const history = useHistory();

	const handleClick = (id) => {
		history.push(`/edit-jobs/${id}`); // Go to <EditJob>
	};

	const handleKeyPress = (id, e) => {
		if (e.key === "Enter" && e.target.tagName === "TR") {
			history.push(`/edit-jobs/${id}`); // Go to <EditJob>
		}
	};

	return (
		<tbody>
			{data.map(
				({
					id,
					customer,
					branch,
					visit_on,
					worker,
					contracted_duration,
					actual_duration,
					difference,
					comment,
				}) => (
					<tr
						key={id}
						role="button"
						onClick={() => handleClick(id)}
						onKeyPress={(e) => handleKeyPress(id, e)}
						tabIndex={0}
					>
						<td>{visit_on}</td>
						<td>{customer}</td>
						<td>{branch}</td>
						<td>{worker}</td>
						<td>{contracted_duration}</td>
						<td>{actual_duration}</td>
						<td>{difference}</td>
						{showComment && <td className="comment-width">{comment}</td>}
					</tr>
				)
			)}
		</tbody>
	);
};

GeneralTableByDate.propTypes = {
	data: PropTypes.array,
	showComment: PropTypes.bool,
};

export default GeneralTableByDate;
