import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

const GeneralWorkerTable = ({ data, state, setState }) => {
	const history = useHistory();

	const handleClick = (id, worker) => {
		setState({ ...state, worker_id: id, worker });
		history.push("/result/worker"); // Go to <ReportPage />
	};

	const handleKeyPress = (id, worker, e) => {
		setState({ ...state, worker_id: id, worker });
		if (e.key === "Enter" && e.target.tagName === "TR") {
			history.push("/result/worker"); // Go to <ReportPage />
		}
	};

	return (
		<tbody>
			{data.map(({ id, contracted_duration, actual_duration, worker }) => (
				<tr
					key={id}
					role="button"
					onClick={() => handleClick(id, worker)}
					onKeyPress={(e) => handleKeyPress(id, worker, e)}
					tabIndex={0}
				>
					<th scope="row">{worker}</th>
					<td>{contracted_duration}</td>
					<td>{actual_duration}</td>
				</tr>
			))}
		</tbody>
	);
};

GeneralWorkerTable.propTypes = {
	data: PropTypes.array,
	state: PropTypes.object,
	setState: PropTypes.func,
};

export default GeneralWorkerTable;
