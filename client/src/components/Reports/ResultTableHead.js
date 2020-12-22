import React from "react";

const ResultTableHead = ({ labels }) => {

	return (
		<thead>
			<tr>
				{labels.map((item) =><th key={item}>{item}</th> )}
			</tr>
		</thead>
	);
};

export default ResultTableHead;