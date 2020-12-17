import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button } from "reactstrap";
import Modal from "./Modal";
import BranchesTable from "./BranchesTable";

const Branches = ({ state, setState }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [branchSaved, setBranchSaved] = useState(false);

	const toggle = () => setIsOpen(!isOpen);

	const handleClick = () => {
		toggle();
	};

	return (
		<div>
			<BranchesTable state={state} trigger={branchSaved} />
			<Button onClick={handleClick}>Add New Address</Button>
			<Modal
				isOpen={isOpen}
				toggle={toggle}
				state={state}
				setState={setState}
				setBranchSaved={setBranchSaved}
				branchSaved={branchSaved}
			/>
		</div>
	);
};

Branches.propTypes = {
	state: PropTypes.object.isRequired,
	setState: PropTypes.func.isRequired,
};

export default Branches;
