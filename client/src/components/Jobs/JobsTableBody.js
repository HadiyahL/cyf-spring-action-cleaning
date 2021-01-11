import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { formatDate } from "../../util/helpers";
import StatusIndicator from "./StatusIndicator";

const JobsTableBody = ({ data }) => {
	const history = useHistory();

	const handleClick = (id) => {
		history.push(`/edit-jobs/${id}`);
	};

	const handleKeyPress = (id, e) => {
		if (e.key === "Enter") {
			history.push(`/edit-jobs/${id}`);
		}
	};

	return (
		<tbody>
			{data.map(
				(
					{
						id,
						customer,
						address,
						worker,
						visit_on,
						status,
						visit_time,
						visit_end,
						duration,
						start_time,
						end_time,
						actual_duration,
					},
					index
				) => (
					<tr
						key={id}
						role="button"
						onClick={() => handleClick(id)}
						onKeyPress={(e) => handleKeyPress(id, e)}
						tabIndex={0}
					>
						<td className={"text-center"} id={`status-${index}`}>
							<StatusIndicator status={status} date={visit_on} index={index} />
						</td>
						<td>{customer}</td>
						<td>{address}</td>
						<td>{worker}</td>
						<td>
							{formatDate(visit_on, {
								year: "numeric",
								month: "short",
								day: "numeric",
							})}
						</td>
						<td>{visit_time}</td>
						<td>{visit_end}</td>
						<td>{duration}</td>
						<td>{start_time}</td>
						<td>{end_time}</td>
						<td>{actual_duration}</td>
					</tr>
				)
			)}
		</tbody>
	);
};

JobsTableBody.propTypes = {
	data: PropTypes.array,
};

export default JobsTableBody;
