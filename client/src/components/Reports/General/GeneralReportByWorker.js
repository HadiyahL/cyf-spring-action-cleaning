import React, { useState } from "react";
import { Table, Button } from "reactstrap";
import PropTypes from "prop-types";
import ResultTableHead from "../ResultTableHead";
import TotalsRow from "./TotalsRow";
import GeneralTableByWorker from "./GeneralTableByWorker";

const GeneralReportByWorker = ({ data }) => {
	const [showComment, setShowComment] = useState(false);

	const hideCommentHandle = () => {
		setShowComment(!showComment);
	};

	const tableHeaderLabels = [];

	const updateTableHeaderLabels = () => {
		if (showComment) {
			tableHeaderLabels.push("Comment");
		}
	};

	updateTableHeaderLabels();
	const [generalTotals] = data.generalTotals;

	return (
		<div>
			<div className="d-flex justify-content-end d-print-none">
				<Button color="link" size="sm" onClick={hideCommentHandle}>
					{showComment ? "Hide comments" : "Show comments"}
				</Button>
			</div>
			<Table hover responsive>
				<ResultTableHead
					labels={[
						"Cleaner",
						"Date",
						"Customer",
						"Address",
						"Contracted Hours",
						"Actual Hours",
						"Difference In Hours",
					].concat(tableHeaderLabels)}
					detailed={false}
				/>
				{Object.entries(data.groupedWorkers).map(([name, jobs], i) => {
					return (
						<GeneralTableByWorker
							key={i}
							name={name.split(" ")[0]}
							data={jobs}
							showComment={showComment}
						/>
					);
				})}
				<tbody>
					<TotalsRow data={generalTotals} showComment={showComment} />
				</tbody>
			</Table>
		</div>
	);
};

GeneralReportByWorker.propTypes = {
	data: PropTypes.object,
};

export default GeneralReportByWorker;
