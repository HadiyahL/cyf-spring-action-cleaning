import React, { createContext, useState } from "react";
import PropTypes from "prop-types";

export const CustomerReportContext = createContext([{}, () => {}]);

export const CustomerReportProvider = ({ children }) => {
	const [state, setState] = useState({
		customer: "",
		customer_id: "",
		start_date: "",
		finish_date: "",
	});

	return (
		<CustomerReportContext.Provider value={[state, setState]}>
			{children}
		</CustomerReportContext.Provider>
	);
};

CustomerReportProvider.propTypes = {
	children: PropTypes.node.isRequired,
};
