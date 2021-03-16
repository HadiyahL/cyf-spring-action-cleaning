import React, { createContext, useState } from "react";
import PropTypes from "prop-types";

export const InvoiceContext = createContext([{}, () => {}]);

export const InvoiceProvider = ({ children }) => {
	const [state, setState] = useState({
		start_date: "",
		finish_date: "",
		customer: "",
		customer_id: "",
		detailed: false,
	});

	return (
		<InvoiceContext.Provider value={[state, setState]}>
			{children}
		</InvoiceContext.Provider>
	);
};

InvoiceProvider.propTypes = {
	children: PropTypes.node.isRequired,
};
