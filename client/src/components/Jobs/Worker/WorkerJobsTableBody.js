import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { formatDate } from "../../../util/helpers";
import StatusIndicator from "../StatusIndicator";

const WorkerJobsTableBody = ({ data }) => {
	const history = useHistory();

	const handleClick = (id) => {
		history.push(`/worker/job/${id}`);
	};

	const handleKeyPress = (id, e) => {
		if (e.key === "Enter") {
			history.push(`/worker/job/${id}`);
		}
	};

	return (
		<tbody>
			{data.map(
				({ id, address, name, visit_on, visit_time, status }, index) => {
					return (
						<tr
							key={id}
							role="button"
							onClick={() => handleClick(id)}
							onKeyPress={(e) => handleKeyPress(id, e)}
							tabIndex={0}
						>
							<td className="text-center align-middle" id={`status-${index}`}>
								<StatusIndicator
									status={status}
									date={visit_on}
									index={index}
								/>
							</td>
							<td className="align-middle">
								<strong>{name}</strong>
								<br />
								{address}
							</td>
							<td className="align-middle">
								{formatDate(visit_on, {
									month: "long",
									day: "numeric",
								})}
							</td>
							<td className="align-middle">{visit_time}</td>
						</tr>
					);
				}
			)}
		</tbody>
	);
};

WorkerJobsTableBody.propTypes = {
	data: PropTypes.array,
};

export default WorkerJobsTableBody;
