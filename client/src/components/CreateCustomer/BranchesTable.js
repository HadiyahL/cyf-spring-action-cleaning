import React from "react";
import PropTypes from "prop-types";
import { Table } from "reactstrap";
import useFetch from "../../hooks/useFetch";
import Spinner from "../UI/Spinner";

const BranchesTable = ({ state, trigger }) => {
	const { data, isLoading, error } = useFetch(
		`/branches/customer/${state.customer_id}`,
		trigger
	);

	if (error) {
		return <div>Oops, something went wrong.</div>;
	} else if (isLoading) {
		return <Spinner />;
	} else {
		const branches = data.rows;
		return (
			<div className="mt-5">
				<h3>Client&apos;s addresses</h3>
				<Table striped hover>
					<thead>
						<tr>
							<th>#</th>
							<th>Address</th>
						</tr>
					</thead>
					<tbody>
						{branches.map((b, i) => (
							<tr key={b.id}>
								<th scope="row">{i + 1}</th>
								<td>{b.address}</td>
							</tr>
						))}
					</tbody>
				</Table>
			</div>
		);
	}
};

BranchesTable.propTypes = {
	state: PropTypes.object.isRequired,
	trigger: PropTypes.func.isRequired,
};

export default BranchesTable;
