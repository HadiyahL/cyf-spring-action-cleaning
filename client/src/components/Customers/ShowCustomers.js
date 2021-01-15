import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { Table } from "reactstrap";

const ShowCustomers = ({ data }) => {
	const history = useHistory();

	const handleClick = (id) => {
		history.push(`/edit-customer/${id}`);
	};

	const handleKeyPress = (id, e) => {
		if (e.key === "Enter") {
			history.push(`/edit-customer/${id}`);
		}
	};

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
				{data.map(({ id, name, email, phone_number, contact_name }, i) => {
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
				})}
			</tbody>
		</Table>
	);
};

ShowCustomers.propTypes = {
	data: PropTypes.array.isRequired,
};

export default ShowCustomers;
