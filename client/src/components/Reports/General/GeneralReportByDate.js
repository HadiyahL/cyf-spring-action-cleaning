import React, { useState } from "react";
import { Table, Button } from "reactstrap";
import PropTypes from "prop-types";

import ResultTableHead from "../ResultTableHead";
import GeneralTableByDate from "./GeneralTableByDate";
import TotalsRow from "./TotalsRow";

const GeneralReportByDate = ({ data }) => {
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
			<Table striped hover responsive>
				<ResultTableHead
					labels={[
						"Date",
						"Customer",
						"Address",
						"Cleaner",
						"Contracted Hours",
						"Actual Hours",
						"Difference In Hours",
					].concat(tableHeaderLabels)}
					detailed={false}
				/>
				<GeneralTableByDate
					data={data.generalData}
					showComments={showComments}
				/>
				<tbody>
					<TotalsRow data={generalTotals} showComments={showComments} />
				</tbody>
			</Table>
		</div>
	);
};

GeneralReportByDate.propTypes = {
	data: PropTypes.object,
};

export default GeneralReportByDate;
