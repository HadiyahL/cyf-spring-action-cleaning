import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { formatDate } from "../../../util/helpers";

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
			{data.map(({ id, address, visit_on, visit_time }) => {
				return (
					<tr
						key={id}
						role="button"
						onClick={() => handleClick(id)}
						onKeyPress={(e) => handleKeyPress(id, e)}
						tabIndex={0}
					>
						<td className="align-middle">{address}</td>
						<td className="align-middle">
							{formatDate(visit_on, {
								year: "numeric",
								month: "short",
								day: "numeric",
							})}
						</td>
						<td className="align-middle">{visit_time}</td>
					</tr>
				);
			})}
		</tbody>
	);
};

WorkerJobsTableBody.propTypes = {
	data: PropTypes.array,
};

export default WorkerJobsTableBody;
