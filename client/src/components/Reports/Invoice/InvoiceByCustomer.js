import React from "react";
import { Table } from "reactstrap";
import PropTypes from "prop-types";
import ResultTableHead from "../ResultTableHead";
import TotalsRow from "./TotalsRow";
import InvoiceTableByAddress from "./InvoiceTableByAddress";

const InvoiceByCustomer = ({ data }) => {
	const [generalTotals] = data.generalTotals;

	return (
		<Table hover responsive>
			<ResultTableHead
				labels={[
					"Address",
					"Date",
					"Cleaner",
					"Contracted Hours",
					"Actual Hours",
					"Difference In Hours",
					"Internal Comment",
					"Cleaning Services",
					"Quantity",
					"Unit Price",
					"Amount GBP",
				]}
				detailed={false}
			/>
			{data.groupedAddresses.map((customerAddresses, i) => (
				<InvoiceTableByAddress key={i} data={customerAddresses} />
			))}
			<tbody>
				<TotalsRow data={generalTotals} />
			</tbody>
		</Table>
	);
};

InvoiceByCustomer.propTypes = {
	data: PropTypes.object,
};

export default InvoiceByCustomer;
