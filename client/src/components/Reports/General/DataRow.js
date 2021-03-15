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
		cleaning_service,
		feedback,
	},
	showComments,
	forWorker,
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

	return (
		<tr
			role={"button"}
			onClick={() => handleClick(id)}
			onKeyPress={(e) => handleKeyPress(id, e)}
			tabIndex={0}
		>
			<td>{forWorker ? firstRow && worker : customer}</td>
			<td>{forWorker ? visit_on : branch}</td>
			<td>{forWorker ? customer : visit_on}</td>
			<td>{forWorker ? branch : worker}</td>
			<td>{contracted_duration}</td>
			<td>{actual_duration}</td>
			<td>{difference}</td>
			{showComments && <td className="comment-width">{cleaning_service}</td>}
			{showComments && <td className="comment-width">{feedback}</td>}
			{showComments && <td className="comment-width">{comment}</td>}
		</tr>
	);
};

DataRow.propTypes = {
	data: PropTypes.object,
	showComments: PropTypes.bool,
	forWorker: PropTypes.bool,
	firstRow: PropTypes.bool,
};

export default DataRow;
