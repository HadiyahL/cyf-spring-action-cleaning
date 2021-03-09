import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

const GeneralCustomerTable = ({ data, state, setState, type }) => {
	const history = useHistory();

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
					key={id}
					role="button"
					onClick={() => handleClick(id, customer)}
					onKeyPress={(e) => handleKeyPress(id, customer, e)}
					tabIndex={0}
				>
					<th scope="row">{customer}</th>
					<td>{contracted_duration}</td>
					<td>{actual_duration}</td>
				</tr>
			))}
		</tbody>
	);
};

GeneralCustomerTable.propTypes = {
	data: PropTypes.array,
	state: PropTypes.object,
	setState: PropTypes.func,
	type: PropTypes.string,
};

export default GeneralCustomerTable;
