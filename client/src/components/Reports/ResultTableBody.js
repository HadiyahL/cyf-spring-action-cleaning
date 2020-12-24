import React from "react";
import PropTypes from "prop-types";

const ResultTableBody = ({ data, bold }) => {

	const formatDate = (h,m) => {
	  return (
			("00"+(h ? h:"")).slice(-2)+":"+("00"+m).slice(-2)
	  );
	};

	return (
		<tbody>
			{data.rows.map(
				({ name, address, duration },ind) => (
					<tr
						key={ind}
					>
						<th scope="row">{name}</th>
						<td className={bold}>{bold ? "Total duration:":address}</td>
						<td className={bold+"Time"}>{formatDate(duration.hours, duration.minutes)}</td>
					</tr>
				)
			)}
		
		</tbody>
	);
};

ResultTableBody.propTypes = {
	data: PropTypes.object,
	total_data: PropTypes.object,
};
export default ResultTableBody;