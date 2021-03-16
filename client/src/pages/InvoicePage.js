import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { InvoiceContext } from "../contexts/Invoice";
import { Invoice } from "../components";

const InvoicePage = () => {
	const [state, setState] = useContext(InvoiceContext);
	const { start_date } = state;

	if (start_date) {
		return <Invoice state={state} setState={setState} />;
	} else {
		return <Redirect to="/select_invoice" />; // Go to <InvoiceSelectionPage />
	}
};

export default InvoicePage;
