import React from "react";
import PropTypes from "prop-types";
import TotalsRow from "./TotalsRow";
import DataRow from "./DataRow";

const GeneralTableByCustomer = ({ data, showComment, addressTotals }) => {
	return (
		<>
			{data.map((branch, i) => {
				return (
					<GenerateAddressRows
						key={i}
						data={branch}
						showComment={showComment}
						addressTotals={addressTotals}
					/>
				);
			})}
		</>
	);
};

const GenerateAddressRows = ({ data, showComment, addressTotals }) => {
	const totalsForAddress = addressTotals.filter(
		(address) => Object.keys(address)[0] === data[0].branch
	)[0][data[0].branch];

	return (
		<tbody>
			{data.map((rowData, i) => (
				<DataRow
					data={rowData}
					key={rowData.id}
					// showComment={showComment}
					firstRow={i === 0}
				/>
			))}
			<TotalsRow
				title={`Total for ${data[0].branch}`}
				showComment={showComment}
				data={totalsForAddress}
			/>
		</tbody>
	);
};

GenerateAddressRows.propTypes = {
	data: PropTypes.array,
	showComment: PropTypes.bool,
	addressTotals: PropTypes.array,
};

GeneralTableByCustomer.propTypes = {
	data: PropTypes.array,
	showComment: PropTypes.bool,
	addressTotals: PropTypes.array,
};

export default GeneralTableByCustomer;
