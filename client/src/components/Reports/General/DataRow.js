import React from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";

const DataRow = ({
	data: {
		id,
		actual_duration,
		customer,
		branch,
		visit_on,
		worker,
		contracted_duration,
		difference,
		comment,
	},
	showComment,
}) => {
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
		<tr
			role={id && "button"}
			onClick={() => id && handleClick(id)}
			onKeyPress={(e) => id && handleKeyPress(id, e)}
			tabIndex={id && 0}
		>
			<td>{customer}</td>
			<td>{branch}</td>
			<td>{visit_on}</td>
			<td>{worker}</td>
			<td>{contracted_duration}</td>
			<td>{actual_duration}</td>
			<td>{difference}</td>
			{showComment && <td className="comment-width">{comment}</td>}
		</tr>
	);
};

DataRow.propTypes = {
	data: PropTypes.object,
	showComment: PropTypes.bool,
};

export default DataRow;
