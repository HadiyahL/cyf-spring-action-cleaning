import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { formatDate } from "../../util/helpers";
import WorkerFeedbackIconButton from "../WorkerJobs/WorkerFeedbackIconButton";

const ResultBranchTableBody = ({ data, detailed, tableFooter }) => {
	const history = useHistory();

	const formatDuration = (h = 0, m = 0) => {
		return h + ":" + ("00" + m).slice(-2);
	};

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
					({ id, visit_on, worker, duration, actual_duration, feedback }) => (
						<tr
							key={id || 0} //In the case of displaying the final line, use 0 for the key and prohibit actions.
							role={id && "button"}
							onClick={() => id && handleClick(id)}
							onKeyPress={(e) => id && handleKeyPress(id, e)}
							tabIndex={id && 0}
						>
							<th scope="row">
								{visit_on
									? formatDate(visit_on, {
											year: "numeric",
											month: "numeric",
											day: "numeric",
									  })
									: ""}
							</th>
							<td className={tableFooter && "font-weight-bold text-right"}>
								{tableFooter ? "Total duration:" : worker}
							</td>
							<td className={tableFooter && "font-weight-bold"}>
								{formatDuration(duration)}
							</td>
							<td className={tableFooter && "font-weight-bold"}>
								{formatDuration(actual_duration.hours, actual_duration.minutes)}
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
				{data.map(({ worker, duration, actual_duration }, ind) => (
					<tr key={ind}>
						<th
							scope="row"
							className={tableFooter && "font-weight-bold text-right"}
						>
							{tableFooter ? "Total duration:" : worker}
						</th>
						<td className={tableFooter && "font-weight-bold"}>
							{formatDuration(duration)}
						</td>
						<td className={tableFooter && "font-weight-bold"}>
							{formatDuration(actual_duration.hours, actual_duration.minutes)}
						</td>
					</tr>
				))}
			</tbody>
		);
	}
};

ResultBranchTableBody.propTypes = {
	data: PropTypes.array,
	tableFooter: PropTypes.bool,
	detailed: PropTypes.bool,
};

export default ResultBranchTableBody;
