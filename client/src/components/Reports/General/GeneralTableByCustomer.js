import React from "react";
import PropTypes from "prop-types";
import TotalsRow from "./TotalsRow";
import DataRow from "./DataRow";
import { totalsForAddress, totalsForCustomer } from "../../../util/helpers";

const GeneralTableByCustomer = ({ data, showComments }) => {
	const customerTotals = totalsForCustomer(data);

	return (
		<>
			{data.map((branch, i) => {
				const addressTotals = totalsForAddress(branch);
				return (
					<GenerateAddressRows
						key={i}
						data={branch}
						showComments={showComments}
						addressTotals={addressTotals}
					/>
				);
			})}
			<tbody>
				<TotalsRow
					showComments={showComments}
					title="Total for customer"
					data={customerTotals}
				/>
			</tbody>
		</>
	);
};

const GenerateAddressRows = ({ data, showComments, addressTotals }) => {
	return (
		<tbody>
			{data.map((rowData) => (
				<DataRow data={rowData} key={rowData.id} showComments={showComments} />
			))}
			<TotalsRow
				title="Total for address"
				showComments={showComments}
				data={addressTotals}
			/>
		</tbody>
	);
};

GenerateAddressRows.propTypes = {
	data: PropTypes.array,
	showComments: PropTypes.bool,
	addressTotals: PropTypes.object,
};

GeneralTableByCustomer.propTypes = {
	data: PropTypes.array,
	showComments: PropTypes.bool,
};

export default GeneralTableByCustomer;
