/* eslint-disable operator-linebreak */
import React, { useState } from "react";
import Spinner from "../UI/Spinner";
import useFetch from "../../hooks/useFetch";
import { ShowCustomers, AddNewButton, SearchInput } from "../";

const CustomersData = () => {
	const [filterInput, setFilterInput] = useState("");
	const { data, isLoading, error } = useFetch("/customers");

	const filterByTerm = (array, term) =>
		array.filter(
			(customer) =>
				customer.name.toLowerCase().includes(term) ||
				customer.contact_name.toLowerCase().includes(term) ||
				customer.email.toLowerCase().includes(term)
		);

	if (error) {
		return <div>Oops, something went wrong.</div>;
	} else if (isLoading) {
		return <Spinner />;
	} else {
		const filteredData = filterByTerm(data.customers, filterInput);
		return (
			<>
				<div className="d-flex justify-content-between">
					<SearchInput setFilterInput={setFilterInput} />
					<AddNewButton pathname="/add-customer" />
				</div>
				<ShowCustomers data={filteredData} />
			</>
		);
	}
};

export default CustomersData;
