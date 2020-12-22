import React from "react";

const ResultTableBody = ({ data }) => {

	return (
		<tbody>
			{data.rows.map(
				({ name, address, duration },ind) => (
					<tr
						key={ind}
						// role="button"
						// onClick={() => handleClick(id)}
						// onKeyPress={(e) => handleKeyPress(id, e)}
						// tabIndex={0}
					>
						<th scope="row">{name}</th>
						<td>{address}</td>
						<td>{duration.hours+":"+duration.minutes}</td>
					</tr>
				)
			)}
		</tbody>
	);
};

export default ResultTableBody;