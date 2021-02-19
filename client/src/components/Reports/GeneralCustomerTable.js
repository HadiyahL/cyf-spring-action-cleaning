import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

const GeneralCustomerTable = ({ data, state, setState, tableFooter }) => {
	const history = useHistory();

	const formatDuration = (h = 0, m = 0) => {
		return ("00" + h).slice(-2) + ":" + ("00" + m).slice(-2);
	};

	const handleClick = (id, customer) => {
		setState({ ...state, customer_id: id, customer });
		history.push("/result/customer");
	};

	const handleKeyPress = (id, customer, e) => {
		setState({ ...state, customer_id: id, customer });
		if (e.key === "Enter" && e.target.tagName === "TR") {
			history.push("/result/customer");
		}
	};

	return (
		<tbody>
			{data.map(({ id, duration, actual_duration, customer }) => (
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
						{formatDuration(duration)}
					</td>
					<td className={tableFooter && "font-weight-bold"}>
						{formatDuration(actual_duration.hours, actual_duration.minutes)}
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
};
export default GeneralCustomerTable;