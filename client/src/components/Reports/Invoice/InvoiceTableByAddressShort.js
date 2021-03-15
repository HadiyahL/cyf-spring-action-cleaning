import React from "react";
import PropTypes from "prop-types";
import TotalsRowShort from "./TotalsRowShort";
import DataRowShort from "./DataRowShort";
import { totalsForAddress } from "../../../util/helpers";

const GeneralTableByCustomer = ({ data }) => {
	return (
		<>
			{data.map((branch, i) => {
				const addressTotals = totalsForAddress(branch);
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
	return (
		<tbody>
			{data.map((rowData, i) => (
				<DataRowShort data={rowData} key={rowData.id} firstRow={i === 0} />
			))}
			<TotalsRowShort
				title={`Total for ${data[0].branch}`}
				data={addressTotals}
			/>
		</tbody>
	);
};

GenerateAddressRows.propTypes = {
	data: PropTypes.array,
	addressTotals: PropTypes.object,
};

GeneralTableByCustomer.propTypes = {
	data: PropTypes.array,
};

export default GeneralTableByCustomer;
