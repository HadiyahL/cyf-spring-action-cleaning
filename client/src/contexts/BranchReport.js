import React, { createContext, useState } from "react";
import PropTypes from "prop-types";

export const BranchReportContext = createContext([{}, () => {}]);

export const BranchReportProvider = ({ children }) => {
	const [state, setState] = useState({
		customer: "",
		customer_id: "",
		branch: "All addresses",
		branch_id: "",
		start_date: "",
		finish_date: "",
		detailed: true,
	});

	return (
		<BranchReportContext.Provider value={[state, setState]}>
			{children}
		</BranchReportContext.Provider>
	);
};

BranchReportProvider.propTypes = {
	children: PropTypes.node.isRequired,
};
