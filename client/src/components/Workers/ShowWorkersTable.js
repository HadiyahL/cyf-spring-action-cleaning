import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { Table } from "reactstrap";

const ShowWorkersTable = ({ data }) => {
	const history = useHistory();

	const handleClick = (id) => {
		history.push(`/edit-worker/${id}`);
	};

	const handleKeyPress = (id, e) => {
		if (e.key === "Enter") {
			history.push(`/edit-worker/${id}`);
		}
	};

	return (
		<Table striped hover responsive>
			<thead>
				<tr>
					<th>#</th>
					<th>Name</th>
					<th title="Main languages spoken">Languages</th>
					<th>Address</th>
					<th>Email</th>
					<th>Phone</th>
					<th>WhatsApp</th>
				</tr>
			</thead>
			<tbody>
				{data.map(
					(
						{ id, name, address, email, phone_number, whatsapp, languages },
						i
					) => {
						return (
							<tr
								key={id}
								role="button"
								onClick={() => handleClick(id)}
								onKeyPress={(e) => handleKeyPress(id, e)}
								tabIndex={0}
							>
								<th scope="row" className="align-middle">
									{i + 1}
								</th>
								<td className="align-middle">{name}</td>
								<td className="align-middle languages-column">{languages}</td>
								<td className="align-middle">{address}</td>
								<td className="align-middle">{email}</td>
								<td className="align-middle">{phone_number}</td>
								<td className="align-middle">{whatsapp}</td>
							</tr>
						);
					}
				)}
			</tbody>
		</Table>
	);
};

ShowWorkersTable.propTypes = {
	data: PropTypes.array.isRequired,
};

export default ShowWorkersTable;
