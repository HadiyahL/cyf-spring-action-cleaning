import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, FormGroup, Label, FormText } from "reactstrap";
import { getWorkers, getWorker } from "../../service";
import Modal from "./Modal";
import useAuthorizationHeaders from "../../hooks/useAuthorizationHeaders";

const SelectWorker = ({ state, setState, error, size = "lg" }) => {
	const [modal, setModal] = useState(false);
	const [data, setData] = useState(null);
	const authorizationHeaders = useAuthorizationHeaders();

	const toggle = () => setModal(!modal);

	const fetchWorkers = () => {
		getWorkers(authorizationHeaders)
			.then((res) => {
				setData({
					name: "workers",
					data: res.workers,
					fetchFunction: fetchWorker,
				});
			})
			.catch((e) => console.log(e));
	};

	const fetchWorker = (id) => {
		getWorker(id, authorizationHeaders)
			.then((res) => {
				const data = res.rows[0];
				setState({
					...state,
					worker: data.worker_name,
					worker_id: id,
				});
			})
			.catch((e) => console.log(e));
	};

	const handleSelectWorkers = () => {
		toggle();
		fetchWorkers();
	};

	return (
		<div className="mb-3 mb-md-4 mb-lg-5">
			<FormGroup>
				<Label for="worker" size={size}>
					Cleaner
				</Label>
				<Button
					outline
					color="primary"
					block
					onClick={handleSelectWorkers}
					size={size}
				>
					{state.worker || "Select cleaner"}
				</Button>
				{error && <FormText color="danger">{error}</FormText>}
			</FormGroup>
			<Modal isOpen={modal} toggle={toggle} data={data} />
		</div>
	);
};

SelectWorker.propTypes = {
	state: PropTypes.object.isRequired,
	setState: PropTypes.func.isRequired,
	error: PropTypes.string,
	size: PropTypes.string,
};

export default SelectWorker;
