import React, { useState } from "react";
import { useQueryClient } from "react-query";
import PropTypes from "prop-types";
import { Button, FormGroup, Label, FormText } from "reactstrap";
import { getWorkersSelect, getWorker } from "../../service";
import Modal from "./Modal";
import useAuthorizationHeaders from "../../hooks/useAuthorizationHeaders";

const SelectWorker = ({
	state,
	setState,
	error,
	size = "lg",
	isOptional = false,
}) => {
	const [modal, setModal] = useState(false);
	const [data, setData] = useState(null);
	const authorizationHeaders = useAuthorizationHeaders();
	const queryClient = useQueryClient();

	const toggle = () => setModal(!modal);

	const fetchWorkers = () => {
		queryClient
			.fetchQuery("getWorkersSelect", () =>
				getWorkersSelect(authorizationHeaders)
			)
			.then((res) => {
				setData({
					name: "workers",
					data: res.workers,
					originalData: res.workers,
					fetchFunction: fetchWorker,
				});
			})
			.catch((e) => console.log(e));
	};

	const fetchWorker = (id) => {
		queryClient
			.fetchQuery("getWorker", () => getWorker(id, authorizationHeaders))
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
					Cleaner {isOptional && <span className="text-muted">(optional)</span>}
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
			<Modal
				isOpen={modal}
				toggle={toggle}
				data={data}
				setData={setData}
				filterBy="name"
			/>
		</div>
	);
};

SelectWorker.propTypes = {
	state: PropTypes.object.isRequired,
	setState: PropTypes.func.isRequired,
	error: PropTypes.string,
	size: PropTypes.string,
	isOptional: PropTypes.bool,
};

export default SelectWorker;
