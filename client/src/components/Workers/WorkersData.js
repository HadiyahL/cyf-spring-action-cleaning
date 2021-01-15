/* eslint-disable operator-linebreak */
import React, { useState } from "react";
import Spinner from "../UI/Spinner";
import useFetch from "../../hooks/useFetch";
import { ShowWorkersTable, AddNewButton, SearchInput } from "..";

const WorkersData = () => {
	const [filterInput, setFilterInput] = useState("");
	const { data, isLoading, error } = useFetch("/workers");

	const filterByTerm = (array, term) =>
		array.filter(
			(worker) =>
				worker.name.toLowerCase().includes(term) ||
				worker.email.toLowerCase().includes(term) ||
				worker.address.toLowerCase().includes(term) ||
				worker.languages.toLowerCase().includes(term)
		);

	if (error) {
		return <div>Oops, something went wrong.</div>;
	} else if (isLoading) {
		return <Spinner />;
	} else {
		const filteredData = filterByTerm(data.workers, filterInput);
		return (
			<>
				<div className="d-flex justify-content-between">
					<SearchInput setFilterInput={setFilterInput} />
					<AddNewButton pathname="/add-worker" />
				</div>
				<ShowWorkersTable data={filteredData} />
			</>
		);
	}
};

export default WorkersData;
