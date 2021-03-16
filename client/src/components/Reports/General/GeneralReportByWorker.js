import React, { useState } from "react";
import { Table, Button } from "reactstrap";
import PropTypes from "prop-types";
import ResultTableHead from "../ResultTableHead";
import TotalsRow from "./TotalsRow";
import GeneralTableByWorker from "./GeneralTableByWorker";

const GeneralReportByWorker = ({ data }) => {
	const [showComments, setShowComments] = useState(false);

	const hideCommentHandle = () => {
		setShowComments(!showComments);
	};

	let tableHeaderLabels = [];

	const updateTableHeaderLabels = () => {
		if (showComments) {
			tableHeaderLabels = [
				"Cleaning Services",
				"Worker Comment",
				"Internal Comment",
			];
		}
	};

	updateTableHeaderLabels();
	const [generalTotals] = data.generalTotals;

	return (
		<div>
			<div className="d-flex justify-content-end d-print-none">
				<Button color="link" size="sm" onClick={hideCommentHandle}>
					{showComments ? "Hide comments" : "Show comments"}
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
							showComments={showComments}
						/>
					);
				})}
				<tbody>
					<TotalsRow data={generalTotals} showComments={showComments} />
				</tbody>
			</Table>
		</div>
	);
};

GeneralReportByWorker.propTypes = {
	data: PropTypes.object,
};

export default GeneralReportByWorker;
