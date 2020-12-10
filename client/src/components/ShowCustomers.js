// import { json } from "express";
import React, { useEffect, useState } from "react";
import { Table } from "reactstrap";
import { getCustomers } from "../service";

const ShowCustomers = ({ customersTrigger }) => {
	const [list, setList] = useState();

	useEffect(() => {
		getCustomers()
			.then((data) => setList(data.customers))
			.catch((err) => console.log(err));
	}, [customersTrigger]);

	console.log(list);
	if (list) {
		return (
			<Table striped>
				<thead>
					<tr>
						<th>#</th>
						<th>Name</th>
						<th>Email</th>
						<th>Phone Number</th>
					</tr>
				</thead>
				<tbody>
					{list.map((customer) => {
						return (
							<tr key={customer.id}>
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
	} else {
		return <></>;
	}
};

export default ShowCustomers;
