import React from "react";
import { useHistory } from "react-router-dom";
import { Table, Button } from "reactstrap";
import Spinner from "./UI/Spinner";
import useFetch from "../hooks/useFetch";
import { sortDescByABC } from "../util/helpers";

const ShowWorkersTable = ({ trigger }) => {
	const { data, isLoading, error } = useFetch("/workers", trigger);
	const history = useHistory();

	const handleClick = (id) => {
		history.push(`/edit-worker/${id}`);
	};

	if (error) {
		return <div>Oops, something wrong.</div>;
	} else if (isLoading) {
		return <Spinner />;
	} else {
		const workers = sortDescByABC(data.workers, "name");

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
						<th></th>
					</tr>
				</thead>
				<tbody>
					{workers.map((worker, i) => {
						return (
							<tr key={worker.id}>
								<th scope="row" className="align-middle">
									{i + 1}
								</th>
								<td className="align-middle">{worker.name}</td>
								<td className="align-middle">{worker.address}</td>
								<td className="align-middle">{worker.email}</td>
								<td className="align-middle">{worker.phone_number}</td>
								<td className="align-middle">{worker.whatsapp}</td>
								<td className="align-middle">
									<Button size="sm" onClick={() => handleClick(worker.id)}>
										EDIT
									</Button>
								</td>
							</tr>
						);
					})}
				</tbody>
			</Table>
		);
	}
};

export default ShowWorkersTable;
