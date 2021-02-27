import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

const GeneralCustomerTable = ({ data, state, setState, tableFooter, type }) => {
	const history = useHistory();

	const formatDuration = ({ hours = 0, minutes = 0 }) => {
		return (
			hours.toString().padStart(2, "0") +
			":" +
			minutes.toString().padStart(2, "0")
		);
	};

	const handleClick = (id, customer) => {
		setState({ ...state, customer_id: id, customer });
		if (type === "customer") {
			history.push("/result/customer"); // Go to <ReportPage>
		} else {
			history.push("/general_branch"); // Go to <BranchReportPage>
		}
	};

	const handleKeyPress = (id, customer, e) => {
		setState({ ...state, customer_id: id, customer });
		if (type === "customer") {
			if (e.key === "Enter" && e.target.tagName === "TR") {
				history.push("/result/customer"); // Go to <ReportPage>
			}
		} else {
			history.push("/result_branch"); // Go to <BranchReportPage>
		}
	};

	return (
		<tbody>
			{data.map(({ id, contracted_duration, actual_duration, customer }) => (
				<tr
					key={id || 0} //In the case of displaying the final line, use 0 for the key and prohibit actions.
					role={id && "button"}
					onClick={() => id && handleClick(id, customer)}
					onKeyPress={(e) => id && handleKeyPress(id, customer, e)}
					tabIndex={id && 0}
				>
					<th
						scope="row"
						className={tableFooter && "font-weight-bold text-right"}
					>
						{tableFooter ? "Total duration:" : customer}
					</th>
					<td className={tableFooter && "font-weight-bold"}>
						{formatDuration(contracted_duration)}
					</td>
					<td className={tableFooter && "font-weight-bold"}>
						{formatDuration(actual_duration)}
					</td>
				</tr>
			))}
		</tbody>
	);
};

GeneralCustomerTable.propTypes = {
	data: PropTypes.array,
	tableFooter: PropTypes.bool,
	state: PropTypes.object,
	setState: PropTypes.func,
	type: PropTypes.string,
};

export default GeneralCustomerTable;
