import React from "react";
import PropTypes from "prop-types";
import TotalsRow from "./TotalsRow";
import DataRow from "./DataRow";
import { totalsForAddress, totalsForCustomer } from "../../../util/helpers";

const GeneralTableByCustomer = ({ data, showComment }) => {
	const customerTotals = totalsForCustomer(data);

	return (
		<>
			{data.map((branch, i) => {
				const addressTotals = totalsForAddress(branch);
				return (
					<GenerateAddressRows
						key={i}
						data={branch}
						showComment={showComment}
						addressTotals={addressTotals}
					/>
				);
			})}
			<tbody>
				<TotalsRow
					showComment={showComment}
					title="Total for customer"
					data={customerTotals}
				/>
			</tbody>
		</>
	);
};

const GenerateAddressRows = ({ data, showComment, addressTotals }) => {
	return (
		<tbody>
			{data.map((rowData) => (
				<DataRow
					data={rowData}
					key={rowData.id || 0}
					showComment={showComment}
				/>
			))}
			<TotalsRow
				title="Total for address"
				showComment={showComment}
				data={addressTotals}
			/>
		</tbody>
	);
};

GenerateAddressRows.propTypes = {
	data: PropTypes.array,
	showComment: PropTypes.bool,
	addressTotals: PropTypes.object,
};

GeneralTableByCustomer.propTypes = {
	data: PropTypes.array,
	showComment: PropTypes.bool,
};

export default GeneralTableByCustomer;
