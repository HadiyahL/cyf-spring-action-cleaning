import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button } from "reactstrap";
import WorkersModal from "./WorkersModal";

const ChangeWorkerButton = ({
	state,
	setState,
	id,
	text,
	workers,
	setWorkers,
}) => {
	const [modal, setModal] = useState(false);

	const toggle = () => {
		setModal(!modal);
		setWorkers({
			...workers,
			data: workers.originalData,
		});
	};

	return (
		<>
			<Button color="secondary" block onClick={toggle}>
				{text}
			</Button>
			<WorkersModal
				isOpen={modal}
				toggle={toggle}
				state={state}
				setState={setState}
				id={id}
				workers={workers}
				setWorkers={setWorkers}
			/>
		</>
	);
};

ChangeWorkerButton.propTypes = {
	state: PropTypes.object.isRequired,
	setState: PropTypes.func.isRequired,
	workers: PropTypes.object.isRequired,
	setWorkers: PropTypes.func.isRequired,
	id: PropTypes.number.isRequired,
	text: PropTypes.string.isRequired,
};

export default ChangeWorkerButton;
