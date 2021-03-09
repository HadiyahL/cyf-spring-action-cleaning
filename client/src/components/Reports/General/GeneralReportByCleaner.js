import React, { useState } from "react";
import { Table, Button } from "reactstrap";
import PropTypes from "prop-types";

import ResultTableHead from "../ResultTableHead";
import GeneralTableByCleaner from "./GeneralTableByCleaner";
import TotalsRow from "./TotalsRow";

const GeneralReportByCleaner = ({ data }) => {
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
			<Table striped hover responsive>
				<ResultTableHead
					labels={[
						"Customer",
						"Address",
						"Date",
						"Cleaner",
						"Contracted Hours",
						"Actual Hours",
						"Difference In Hours",
					].concat(tableHeaderLabels)}
					detailed={false}
				/>
				<GeneralTableByCleaner
					data={data.generalData}
					showComment={showComment}
				/>
				<tbody>
					<TotalsRow data={generalTotals} showComment={showComment} />
				</tbody>
			</Table>
		</div>
	);
};

GeneralReportByCleaner.propTypes = {
	data: PropTypes.object,
};

export default GeneralReportByCleaner;
