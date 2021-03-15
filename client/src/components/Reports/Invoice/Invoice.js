import React from "react";
import { Container } from "reactstrap";
import { Title, Spinner } from "../../";
import useFetch from "../../../hooks/useFetch";
import InvoiceByCustomer from "./InvoiceByCustomer";
import InvoiceByCustomerShort from "./InvoiceByCustomerShort";

const Invoice = ({ state }) => {
	const { start_date, finish_date, customer_id, customer, detailed } = state;
	const { data, error, isLoading } = useFetch(
		`/invoice/${customer_id}/${start_date}/${finish_date}`
	);

	if (error) {
		return <div>Error</div>;
	} else if (isLoading) {
		return <Spinner />;
	} else {
		return (
			<Container>
				<Title text={`Invoice for ${customer}`} />
				<h3 className="text-center mt-4 mt-md-5 mb-5 mb-md-5">
					{start_date} — {finish_date}
				</h3>
				{data.generalData.length === 0 ? (
					<p>No data for this period.</p>
				) : detailed ? (
					<InvoiceByCustomer data={data} />
				) : (
					<InvoiceByCustomerShort data={data} />
				)}
			</Container>
		);
	}
};

export default Invoice;
