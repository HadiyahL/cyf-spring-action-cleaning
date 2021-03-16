import React from "react";
import PropTypes from "prop-types";
import TotalsRowShort from "./TotalsRowShort";
import DataRowShort from "./DataRowShort";

const GeneralTableByCustomer = ({ data, addressTotals }) => {
	return (
		<>
			{data.map((branch, i) => {
				return (
					<GenerateAddressRows
						key={i}
						data={branch}
						addressTotals={addressTotals}
					/>
				);
			})}
		</>
	);
};

const GenerateAddressRows = ({ data, addressTotals }) => {
	const totalsForAddress = addressTotals.filter(
		(address) => Object.keys(address)[0] === data[0].branch
	)[0][data[0].branch];

	return (
		<tbody>
			{data.map((rowData, i) => (
				<DataRowShort data={rowData} key={rowData.id} firstRow={i === 0} />
			))}
			<TotalsRowShort
				title={`Total for ${data[0].branch}`}
				data={totalsForAddress}
			/>
		</tbody>
	);
};

GenerateAddressRows.propTypes = {
	data: PropTypes.array,
	addressTotals: PropTypes.array,
};

GeneralTableByCustomer.propTypes = {
	data: PropTypes.array,
	addressTotals: PropTypes.array,
};

export default GeneralTableByCustomer;
