import React from "react";
import { useHistory } from "react-router-dom";
import { Table } from "reactstrap";
import Spinner from "../components/UI/Spinner";
import useFetch from "../hooks/useFetch";

const ShowCustomers = ({ customersTrigger }) => {
	const history = useHistory();
	const { data, isLoading, error } = useFetch("/customers", customersTrigger);

	const handleClick = (id) => {
		history.push(`/edit-customer/${id}`);
	};

	if (error) {
		return <div>Oops, something went wrong.</div>;
	} else if (isLoading) {
		return <Spinner />;
	} else {
		return (
			<Table striped hover responsive>
				<thead>
					<tr>
						<th>#</th>
						<th>Name</th>
						<th>Email</th>
						<th>Phone Number</th>
					</tr>
				</thead>
				<tbody>
					{data.customers.map((customer) => {
						return (
							<tr
								key={customer.id}
								onClick={() => handleClick(customer.id)}
								role="button"
								tabIndex={0}
							>
								<th scope="row">{customer.id}</th>
								<td>{customer.name}</td>
								<td>{customer.email}</td>
								<td>{customer.phone_number}</td>
							</tr>
						);
					})}
				</tbody>
			</Table>
		);
	}
};

export default ShowCustomers;
