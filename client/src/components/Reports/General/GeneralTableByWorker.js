import React from "react";
import PropTypes from "prop-types";
import TotalsRow from "./TotalsRow";
import DataRow from "./DataRow";
import { totalsForAddress } from "../../../util/helpers";

const GeneralTableByWorker = ({ name, data, showComments }) => {
	const workerTotals = totalsForAddress(data);
	return (
		<tbody>
			{data.map((job, i) => {
				return (
					<DataRow
						data={job}
						firstRow={i === 0}
						key={job.id}
						showComments={showComments}
						forWorker
					/>
				);
			})}
			<TotalsRow
				title={`Total for ${name}`}
				showComments={showComments}
				data={workerTotals}
			/>
		</tbody>
	);
};

GeneralTableByWorker.propTypes = {
	data: PropTypes.array,
	showComments: PropTypes.bool,
	name: PropTypes.string,
};

export default GeneralTableByWorker;
