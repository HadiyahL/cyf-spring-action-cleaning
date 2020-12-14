import React, { useState } from "react";
import {
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	ListGroup,
	ListGroupItem,
	Button,
} from "reactstrap";

const ModalComponent = ({ isOpen, toggle, data }) => {
	return (
		<div>
			<Modal isOpen={isOpen} toggle={toggle}>
				<ModalHeader toggle={toggle}>Select {data.name}</ModalHeader>
				<ModalBody>
					<ListGroup>
						{data.data.map((item) => {
							return (
								<ListGroupItem
									tag="button"
									action
									key={item.id}
									onClick={() => {
										data.fetchFunction(item.id);
										toggle();
									}}
								>
									{item.name}
								</ListGroupItem>
							);
						})}
					</ListGroup>
				</ModalBody>
				<ModalFooter>
					<Button color="secondary" onClick={toggle}>
						Close
					</Button>
				</ModalFooter>
			</Modal>
		</div>
	);
};

export default ModalComponent;
