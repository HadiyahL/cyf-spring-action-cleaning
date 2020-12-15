import React from "react";
import PropTypes from "prop-types";
import {
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	ListGroup,
	ListGroupItem,
	Button,
} from "reactstrap";
import Spinner from "../UI/Spinner";

const ModalComponent = ({ isOpen, toggle, data }) => {
	return (
		<div>
			<Modal isOpen={isOpen} toggle={toggle}>
				{data ? (
					<>
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
											{item.name || item.address}
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
					</>
				) : (
					<Spinner />
				)}
			</Modal>
		</div>
	);
};

ModalComponent.propTypes = {
	toggle: PropTypes.func.isRequired,
	isOpen: PropTypes.bool.isRequired,
	data: PropTypes.object,
};

export default ModalComponent;
