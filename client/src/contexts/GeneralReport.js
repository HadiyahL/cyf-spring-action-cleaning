import React, { createContext, useState } from "react";
import PropTypes from "prop-types";

export const GeneralReportContext = createContext([{}, () => {}]);

export const GeneralReportProvider = ({ children }) => {
	const [state, setState] = useState({
		start_date: "",
		finish_date: "",
		byCustomer: true,
	});

	return (
		<GeneralReportContext.Provider value={[state, setState]}>
			{children}
		</GeneralReportContext.Provider>
	);
};

GeneralReportProvider.propTypes = {
	children: PropTypes.node.isRequired,
};
