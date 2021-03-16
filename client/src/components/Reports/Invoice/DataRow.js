import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { hoursToInt } from "../../../util/helpers";

const DataRow = ({
	data: {
		id,
		actual_duration,
		branch,
		visit_on,
		worker,
		contracted_duration,
		difference,
		comment,
		cleaning_service,
		unit_price,
	},
	firstRow,
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

	const quantity = hoursToInt(contracted_duration);
	const amount = quantity * unit_price;

	return (
		<tr
			role="button"
			onClick={() => handleClick(id)}
			onKeyPress={(e) => handleKeyPress(id, e)}
			tabIndex={0}
		>
			<td>{firstRow && branch}</td>
			<td>{visit_on}</td>
			<td>{worker}</td>
			<td>{contracted_duration}</td>
			<td>{actual_duration}</td>
			<td>{difference}</td>
			<td className="comment-width">{comment}</td>
			<td className="comment-width">{cleaning_service}</td>
			<td>{quantity.toFixed(2)}</td>
			<td>{unit_price.toFixed(2)}</td>
			<td>{amount.toFixed(2)}</td>
		</tr>
	);
};

DataRow.propTypes = {
	data: PropTypes.object,
	firstRow: PropTypes.bool,
};

export default DataRow;
