import React from "react";
import PropTypes from "prop-types";
import { Container } from "reactstrap";
import { Title, Spinner, BackButton } from "../../";
import useFetch from "../../../hooks/useFetch";
import InvoiceByCustomer from "./InvoiceByCustomer";
import InvoiceByCustomerShort from "./InvoiceByCustomerShort";
import { transformDate } from "../../../util/helpers";

const Invoice = ({ state, setState }) => {
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
					{transformDate(start_date)} — {transformDate(finish_date)}
				</h3>
				{data.generalData.length === 0 ? (
					<p>No data for this period.</p>
				) : detailed ? (
					<InvoiceByCustomer data={data} />
				) : (
					<InvoiceByCustomerShort data={data} />
				)}
				<div className="d-flex justify-content-end mt-5">
					<BackButton state={state} setState={setState} />
				</div>
			</Container>
		);
	}
};

Invoice.propTypes = {
	state: PropTypes.object,
	setState: PropTypes.func,
};

export default Invoice;
