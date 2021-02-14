import React from "react";
import PropTypes from "prop-types";

const ResultTableHead = ({ labels, detailed }) => {

	return (
		<thead>
			<tr>
				{labels.map((item) =><th key={item}>{item}</th> )}
				{detailed && <th className="d-print-none"></th>}
			</tr>
		</thead>
	);
};

ResultTableHead.propTypes = {
	labels: PropTypes.array,
	detailed: PropTypes.bool,
};

export default ResultTableHead;