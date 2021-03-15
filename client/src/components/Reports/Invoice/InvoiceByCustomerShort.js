import React from "react";
import { Table } from "reactstrap";
import PropTypes from "prop-types";
import ResultTableHead from "../ResultTableHead";
import TotalsRow from "./TotalsRowShort";
import InvoiceTableByAddress from "./InvoiceTableByAddressShort";

const InvoiceByCustomerShort = ({ data }) => {
	const [generalTotals] = data.generalTotals;

	return (
		<Table hover responsive>
			<ResultTableHead
				labels={[
					"Address",
					"Date",
					"Contracted Hours",
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

InvoiceByCustomerShort.propTypes = {
	data: PropTypes.object,
};

export default InvoiceByCustomerShort;
