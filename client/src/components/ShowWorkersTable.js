import React from "react";
import { useHistory } from "react-router-dom";
import { Table } from "reactstrap";
import Spinner from "./UI/Spinner";
import useFetch from "../hooks/useFetch";
import { sortAscByABC } from "../util/helpers";

const ShowWorkersTable = ({ trigger }) => {
	const { data, isLoading, error } = useFetch("/workers", trigger);
	const history = useHistory();

	const handleClick = (id) => {
		history.push(`/edit-worker/${id}`);
	};

	const handleKeyPress = (id, e) => {
		if (e.key === "Enter") {
			history.push(`/edit-worker/${id}`);
		}
	};

	if (error) {
		return <div>Oops, something wrong.</div>;
	} else if (isLoading) {
		return <Spinner />;
	} else {
		const workers = sortAscByABC(data.workers, "name");

		return (
			<Table striped responsive>
				<thead>
					<tr>
						<th>#</th>
						<th>Name</th>
						<th>Address</th>
						<th>Email</th>
						<th>Phone</th>
						<th>WhatsApp</th>
					</tr>
				</thead>
				<tbody>
					{workers.map(
						({ id, name, address, email, phone_number, whatsapp }, i) => {
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
	}
};

export default ShowWorkersTable;
