import React from "react";
import PropTypes from "prop-types";

const ResultTableHead = ({ labels }) => {

	return (
		<thead>
			<tr>
				{labels.map((item) =><th key={item}>{item}</th> )}
			</tr>
		</thead>
	);
};

ResultTableHead.propTypes = {
	labels: PropTypes.array,
};

export default ResultTableHead;