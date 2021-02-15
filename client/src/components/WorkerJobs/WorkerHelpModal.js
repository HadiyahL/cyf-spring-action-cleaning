import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const WorkerHelpModal = () => {
	const [modal, setModal] = useState(false);
	const toggle = () => setModal(!modal);

	return (
		<>
			<Button color="link" onClick={toggle}>
				Info
			</Button>
			<Modal isOpen={modal} toggle={toggle}>
				<ModalHeader toggle={toggle}>Information</ModalHeader>
				<ModalBody>
					<p>
						<i>EN:</i> Tap or click on the job row for more information.
					</p>
					<p>
						<i>FR:</i> Appuyez ou cliquez sur la ligne d&apos;emploi pour plus
						d&apos;informations.
					</p>
				</ModalBody>
				<ModalFooter>
					<Button color="primary" onClick={toggle}>
						Close
					</Button>
				</ModalFooter>
			</Modal>
		</>
	);
};

export default WorkerHelpModal;
