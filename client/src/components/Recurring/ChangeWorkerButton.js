import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button } from "reactstrap";
import WorkersModal from "./WorkersModal";

const ChangeWorkerButton = ({ state, setState, id, text }) => {
	const [modal, setModal] = useState(false);

	const toggle = () => setModal(!modal);

	return (
		<>
			<Button color="secondary" outline onClick={toggle}>
				{text}
			</Button>
			<WorkersModal
				isOpen={modal}
				toggle={toggle}
				state={state}
				setState={setState}
				id={id}
			/>
		</>
	);
};

ChangeWorkerButton.propTypes = {
	state: PropTypes.object.isRequired,
	setState: PropTypes.func.isRequired,
	id: PropTypes.number.isRequired,
	text: PropTypes.string.isRequired,
};

export default ChangeWorkerButton;
