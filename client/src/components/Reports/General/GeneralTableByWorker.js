import React from "react";
import PropTypes from "prop-types";
import TotalsRow from "./TotalsRow";
import DataRow from "./DataRow";
import { totalsForAddress } from "../../../util/helpers";

const GeneralTableByWorker = ({ name, data, showComment }) => {
	const workerTotals = totalsForAddress(data);
	return (
		<tbody>
			{data.map((job, i) => {
				return (
					<DataRow
						data={job}
						firstRow={i === 0}
						key={job.id}
						showComment={showComment}
						forWorker
					/>
				);
			})}
			<TotalsRow
				title={`Total for ${name}`}
				showComment={showComment}
				data={workerTotals}
			/>
		</tbody>
	);
};

GeneralTableByWorker.propTypes = {
	data: PropTypes.array,
	showComment: PropTypes.bool,
	name: PropTypes.string,
};

export default GeneralTableByWorker;
