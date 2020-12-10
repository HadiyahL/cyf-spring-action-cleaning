import React, { useState ,useEffect } from "react";
import { Table } from "reactstrap";


import { getWorkers } from "../service";
const ShowWorkersForm = ({ trigger }) => {
	const [list, setList] = useState();
	useEffect(() => getWorkers()
		.then((data) => setList(data.workers))
		.catch((err) => console.error(err)),[trigger]);


	if (list) {
		return (
			<Table striped>
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
					{list.map((worker) => {
						return(
							<tr key={worker.id}>
								<th scope="row">{worker.id}</th>
								<td>{worker.name}</td>
								<td>{worker.address}</td>
								<td>{worker.email}</td>
								<td>{worker.phone_number}</td>
								<td>{worker.whatsapp}</td>
							</tr>
						);
					} )}


				</tbody>
			</Table>
		);
	} else {
		return <> </>;
	}
};

export default ShowWorkersForm;