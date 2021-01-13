import React from "react";
import PropTypes from "prop-types";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import BranchForm from "./BranchForm";

const BranchModal = ({
	isOpen,
	toggle,
	state,
	setState,
	branchSaved,
	setBranchSaved,
}) => {
	return (
		<div>
			<Modal isOpen={isOpen} toggle={toggle}>
				<ModalHeader toggle={toggle} className="px-md-4">
					{state.branch_id ? "Edit" : "Add"} Address
				</ModalHeader>
				<ModalBody>
					<BranchForm
						state={state}
						setState={setState}
						toggle={toggle}
						setBranchSaved={setBranchSaved}
						branchSaved={branchSaved}
					/>
				</ModalBody>
			</Modal>
		</div>
	);
};

BranchModal.propTypes = {
	toggle: PropTypes.func.isRequired,
	isOpen: PropTypes.bool.isRequired,
	state: PropTypes.object,
	setState: PropTypes.func,
	branchSaved: PropTypes.bool,
	setBranchSaved: PropTypes.func,
};

export default BranchModal;
