import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import WorkerFeedbackIconButton from "../WorkerJobs/WorkerFeedbackIconButton";

const ResultTableBody = ({ data, detailed, tableFooter }) => {
	const history = useHistory();

	const handleClick = (id) => {
		history.push(`/edit-jobs/${id}`); // Go to <EditJob>
	};

	const handleKeyPress = (id, e) => {
		if (e.key === "Enter" && e.target.tagName === "TR") {
			history.push(`/edit-jobs/${id}`); // Go to <EditJob>
		}
	};

	if (detailed) {
		return (
			<tbody>
				{data.map(
					({
						id,
						visit_on,
						column_1,
						column_2,
						contracted_duration,
						actual_duration,
						worker,
						feedback,
					}) => (
						<tr
							key={id || 0} //In the case of displaying the final line, use 0 for the key and prohibit actions.
							role={id && "button"}
							onClick={() => id && handleClick(id)}
							onKeyPress={(e) => id && handleKeyPress(id, e)}
							tabIndex={id && 0}
						>
							<th scope="row">{visit_on ? visit_on : ""}</th>
							<td>{column_1}</td>
							<td className={tableFooter && "font-weight-bold text-right"}>
								{tableFooter ? "Total duration:" : column_2}
							</td>
							<td className={tableFooter && "font-weight-bold"}>
								{contracted_duration}
							</td>
							<td className={tableFooter && "font-weight-bold"}>
								{actual_duration}
							</td>
							<td className="text-center d-print-none">
								{feedback && (
									<WorkerFeedbackIconButton
										feedback={feedback}
										worker={worker}
									/>
								)}
							</td>
						</tr>
					)
				)}
			</tbody>
		);
	} else {
		return (
			<tbody>
				{data.map(
					(
						{ column_1, column_2, contracted_duration, actual_duration },
						ind
					) => (
						<tr key={ind}>
							<th scope="row">{column_1}</th>
							<td className={tableFooter && "font-weight-bold text-right"}>
								{tableFooter ? "Total duration:" : column_2}
							</td>
							<td className={tableFooter && "font-weight-bold"}>
								{contracted_duration}
							</td>
							<td className={tableFooter && "font-weight-bold"}>
								{actual_duration}
							</td>
						</tr>
					)
				)}
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
