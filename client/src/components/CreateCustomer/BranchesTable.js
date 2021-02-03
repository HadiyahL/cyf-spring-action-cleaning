import React from "react";
import PropTypes from "prop-types";
import { Table } from "reactstrap";
import useFetch from "../../hooks/useFetch";
import Spinner from "../UI/Spinner";
import BranchModal from "./BranchModal";
import { sortAscByABC } from "../../util/helpers";

const BranchesTable = ({ state, toggleEditModal, setState, isOpen }) => {
	const { data, isLoading, error, refetch } = useFetch(
		`/branches/customer/${state.customer_id}`,
		refetch
	);

	const isMainBranch = (branchId) => state.main_branch_id === branchId;

	const openModal = (id) => {
		const {
			address,
			contact_phone,
			details,
			duration,
			worker_id,
			visit_time,
			id: branchId,
		} = data.rows.filter((b) => b.id === id)[0];

		// populate BranchForm state for editing branch
		setState({
			...state,
			address: address,
			contact_phone: contact_phone,
			details: details ?? "",
			duration: duration ?? "1",
			worker_id: worker_id,
			visit_time: visit_time ?? "",
			branch_id: branchId,
		});
		toggleEditModal();
	};

	const handleClick = (id) => {
		openModal(id);
	};

	const handleKeyPress = (id, e) => {
		if (e.key === "Enter") {
			openModal(id);
		}
	};

	if (error) {
		return <div>Oops, something went wrong.</div>;
	} else if (isLoading) {
		return <Spinner />;
	} else {
		const branches = sortAscByABC(data.rows, "address");
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
							<tr
								key={b.id}
								onClick={() => handleClick(b.id)}
								onKeyPress={(e) => handleKeyPress(b.id, e)}
								role="button"
								tabIndex={0}
							>
								<th scope="row">{i + 1}</th>
								<td>
									{isMainBranch(b.id) ? (
										<strong>{`${b.address} (main address)`}</strong>
									) : (
										b.address
									)}
								</td>
							</tr>
						))}
					</tbody>
				</Table>
				<BranchModal
					isOpen={isOpen}
					toggle={toggleEditModal}
					state={state}
					setState={setState}
					refetchBranches={refetch}
				/>
			</div>
		);
	}
};

BranchesTable.propTypes = {
	state: PropTypes.object.isRequired,
	setState: PropTypes.func.isRequired,
	toggleEditModal: PropTypes.func.isRequired,
	isOpen: PropTypes.bool.isRequired,
};

export default BranchesTable;
