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

	const handleKeyPress = (id, e) => {
		if (e.key === "Enter") {
			history.push(`/edit-customer/${id}`);
		}
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
						<th>Contact Name</th>
						<th>Email</th>
						<th>Phone Number</th>
					</tr>
				</thead>
				<tbody>
					{data.customers.map(
						({ id, name, email, phone_number, contact_name }, i) => {
							return (
								<tr
									key={id}
									onClick={() => handleClick(id)}
									onKeyPress={(e) => handleKeyPress(id, e)}
									role="button"
									tabIndex={0}
								>
									<th scope="row">{i + 1}</th>
									<td>{name}</td>
									<td>{contact_name}</td>
									<td>{email}</td>
									<td>{phone_number}</td>
								</tr>
							);
						}
					)}
				</tbody>
			</Table>
		);
	}
};

export default ShowCustomers;
