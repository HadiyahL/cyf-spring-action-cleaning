import React from "react";
import PropTypes from "prop-types";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
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
					Add address
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
				<ModalFooter className="px-md-4">
					<Button color="secondary" onClick={toggle}>
						Close
					</Button>
				</ModalFooter>
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
