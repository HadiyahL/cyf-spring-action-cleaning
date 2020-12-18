import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button } from "reactstrap";
import BranchesTable from "./BranchesTable";

const Branches = ({ state, setState }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [branchSaved, setBranchSaved] = useState(false);

	const toggle = () => setIsOpen(!isOpen);

	const handleClick = () => {
		// reset state for adding new branch
		setState({
			...state,
			address: "",
			duration: "1",
			contact_name: "",
			visit_time: undefined,
			details: "",
			contact_phone: "",
			branch_id: null,
			worker_id: null,
		});
		toggle();
	};

	return (
		<div>
			<BranchesTable
				state={state}
				trigger={branchSaved}
				toggleEditModal={toggle}
				setBranchSaved={setBranchSaved}
				setState={setState}
				isOpen={isOpen}
			/>
			<Button onClick={handleClick}>Add New Address</Button>
		</div>
	);
};

Branches.propTypes = {
	state: PropTypes.object.isRequired,
	setState: PropTypes.func.isRequired,
};

export default Branches;
