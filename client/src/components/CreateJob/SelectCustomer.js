import React, { useState } from "react";
import { useQueryClient } from "react-query";
import PropTypes from "prop-types";
import { Button, FormGroup, Label, FormText } from "reactstrap";
import { getCustomersSelect, getJobsCustomer } from "../../service";
import Modal from "./Modal";
import useAuthorizationHeaders from "../../hooks/useAuthorizationHeaders";

const SelectCustomer = ({ state, setState, error, forReport = false }) => {
	const [modal, setModal] = useState(false);
	const [data, setData] = useState(null);
	const authorizationHeaders = useAuthorizationHeaders();
	const queryClient = useQueryClient();

	const toggle = () => setModal(!modal);

	const fetchCustomers = () => {
		queryClient
			.fetchQuery("getCustomersSelect", () =>
				getCustomersSelect(authorizationHeaders)
			)
			.then((res) => {
				setData({
					name: "customer",
					data: res.customers,
					originalData: res.customers,
					fetchFunction: fetchCustomer,
				});
			})
			.catch((e) => console.log(e));
	};

	const fetchCustomer = (id) => {
		queryClient
			.fetchQuery("getJobsCustomer", () =>
				getJobsCustomer(id, authorizationHeaders)
			)
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
					duration: data.duration,
					details: data.branch_details || "",
				});
			})
			.catch((e) => console.log(e));
	};

	const handleSelectCustomers = () => {
		toggle();
		fetchCustomers();
	};

	const clearId = () => {
		setState({
			...state,
			customer: "All customers",
			customer_id: "",
		});
	};

	return (
		<div className="mb-3 mb-md-4 mb-lg-5">
			<FormGroup>
				<div className="d-flex justify-content-between">
					<Label for="customer" size="lg">
						Customer
					</Label>
					{forReport && state.customer_id && (
						<Button color="link" size="sm" onClick={clearId}>
							Reset
						</Button>
					)}
				</div>
				<Button
					outline
					color="primary"
					block
					size="lg"
					onClick={handleSelectCustomers}
				>
					{state.customer || "Select customer"}
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

SelectCustomer.propTypes = {
	state: PropTypes.object.isRequired,
	setState: PropTypes.func.isRequired,
	error: PropTypes.string,
	forReport: PropTypes.bool,
};

export default SelectCustomer;
