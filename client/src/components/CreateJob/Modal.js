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
import FilterInput from "../UI/FilterInput";
import { sortAscByABC } from "../../util/helpers";

const ModalComponent = ({ isOpen, toggle, data, setData, filterBy }) => {
	return (
		<div>
			<Modal isOpen={isOpen} toggle={toggle}>
				{data ? (
					<>
						<ModalHeader toggle={toggle}>Select {data.name}</ModalHeader>
						<ModalBody>
							<FilterInput setData={setData} filterBy={filterBy} />
							<ListGroup>
								{sortAscByABC(data.data, filterBy).map((item) => {
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
							<Button color="primary" onClick={toggle}>
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
	setData: PropTypes.func,
	filterBy: PropTypes.string,
};

export default ModalComponent;
