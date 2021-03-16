import React from "react";
import { Container } from "reactstrap";
import { Title, SelectInvoice } from "../components";

const InvoiceSelectionPage = () => {
	return (
		<Container>
			<Title text="Invoice" />
			<SelectInvoice />
		</Container>
	);
};

export default InvoiceSelectionPage;
