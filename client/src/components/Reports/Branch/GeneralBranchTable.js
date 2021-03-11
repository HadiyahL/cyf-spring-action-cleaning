import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

const GeneralBranchTable = ({ data, state, setState }) => {
	const history = useHistory();

	const handleClick = (id, address) => {
		setState({ ...state, branch_id: id, branch: address });
		history.push("/result_branch"); // Go to <BranchReportPage>
	};

	const handleKeyPress = (id, address, e) => {
		setState({ ...state, branch_id: id, branch: address });
		if (e.key === "Enter" && e.target.tagName === "TR") {
			history.push("/result_branch"); // Go to <BranchReportPage>
		}
	};

	return (
		<tbody>
			{data.map(({ id, contracted_duration, actual_duration, address }) => (
				<tr
					key={id}
					role="button"
					onClick={() => handleClick(id, address)}
					onKeyPress={(e) => handleKeyPress(id, address, e)}
					tabIndex={0}
				>
					<th scope="row">{address}</th>
					<td>{contracted_duration}</td>
					<td>{actual_duration}</td>
				</tr>
			))}
		</tbody>
	);
};

GeneralBranchTable.propTypes = {
	data: PropTypes.array,
	state: PropTypes.object,
	setState: PropTypes.func,
};

export default GeneralBranchTable;
