import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, FormGroup, Label, FormText } from "reactstrap";
import { getCustomers, getJobsCustomer } from "../../service";
import Modal from "./Modal";

const SelectCustomer = ({ state, setState, error }) => {
	const [modal, setModal] = useState(false);
	const [data, setData] = useState(null);
	const toggle = () => setModal(!modal);

	const fetchCustomers = () => {
		getCustomers()
			.then((res) => {
				setData({
					name: "customers",
					data: res.customers,
					fetchFunction: fetchCustomer,
				});
			})
			.catch((e) => console.log(e));
	};

	const fetchCustomer = (id) => {
		getJobsCustomer(id)
			.then((res) => {
				const data = res.rows[0];
				setState({
					...state,
					customer: data.customer_name,
					customer_id: id,
					branch: data.address ?? null,
					branch_id: data.branch_id ?? null,
					worker: state.worker || (data.worker_name ?? null),
					worker_id: state.worker_id || (data.worker_id ?? null),
					visit_time: data.visit_time ?? null,
					duration: data.duration ?? null,
				});
			})
			.catch((e) => console.log(e));
	};

	const handleSelectCustomers = () => {
		toggle();
		fetchCustomers();
	};

	return (
		<div className="mb-3 mb-md-4 mb-lg-5">
			<FormGroup>
				<Label for="customer" size="lg">
					Client
				</Label>
				<Button
					outline
					color="primary"
					block
					size="lg"
					onClick={handleSelectCustomers}
				>
					{state.customer || "Select client"}
				</Button>
				{error && <FormText color="danger">{error}</FormText>}
			</FormGroup>
			<Modal isOpen={modal} toggle={toggle} data={data} />
		</div>
	);
};

SelectCustomer.propTypes = {
	state: PropTypes.object.isRequired,
	setState: PropTypes.func.isRequired,
	error: PropTypes.string,
};

export default SelectCustomer;
