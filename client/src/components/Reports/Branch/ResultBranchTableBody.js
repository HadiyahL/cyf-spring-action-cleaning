import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import WorkerFeedbackIconButton from "../../WorkerJobs/WorkerFeedbackIconButton";

const ResultBranchTableBody = ({ data, detailed }) => {
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
						worker,
						contracted_duration,
						actual_duration,
						feedback,
					}) => (
						<tr
							key={id}
							role="button"
							onClick={() => handleClick(id)}
							onKeyPress={(e) => handleKeyPress(id, e)}
							tabIndex={0}
						>
							<th scope="row">{visit_on}</th>
							<td>{worker}</td>
							<td>{contracted_duration}</td>
							<td>{actual_duration}</td>
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
				{data.map(({ worker, contracted_duration, actual_duration }, ind) => (
					<tr key={ind}>
						<th scope="row">{worker}</th>
						<td>{contracted_duration}</td>
						<td>{actual_duration}</td>
					</tr>
				))}
			</tbody>
		);
	}
};

ResultBranchTableBody.propTypes = {
	data: PropTypes.array,
	detailed: PropTypes.bool,
};

export default ResultBranchTableBody;
