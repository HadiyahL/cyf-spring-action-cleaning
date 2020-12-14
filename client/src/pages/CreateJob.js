import React, { useState } from "react";
import { Container, Button } from "reactstrap";
import { getCustomers, getCustomer } from "../service";
import { Modal } from "../components";

const Jobs = () => {
	// all state here
	const [data, setData] = useState(null);
	const [modal, setModal] = useState(false);
	const [state, setState] = useState({
		customer: "",
		customer_id: "",
		branch: "",
		branch_id: "",
		worker: "",
		worker_id: "",
		details: "",
		visit_on: "",
		visit_time: "",
		duration: "",
		pay_rate: "",
	});

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

	const handleSelectCustomers = () => {
		toggle();
		fetchCustomers();
	};

	const fetchCustomer = (id) => {
		getCustomer(id)
			.then((res) => {
				console.log("res :>> ", res);
				const data = res.rows[0];
				setState({
					...state,
					customer: data.customer_name,
					customer_id: id,
					branch: data.address ?? null,
					branch_id: data.branch_id ?? null,
					worker: data.worker_name ?? null,
					worker_id: data.worker_id ?? null,
					visit_time: data.visit_time ?? null,
					duration: data.duration ?? null,
				});
			})
			.catch((e) => console.log(e));
	};

	return (
		<Container>
			<h2 className="text-center mt-4 mt-md-5 mb-5 mb-md-5">Create Job</h2>
			<div>
				<h3>select client</h3>
				<Button color="danger" onClick={handleSelectCustomers}>
					{state.customer || "Select Client"}
				</Button>
			</div>
			<div>
				select branch. address: {state.branch} id: {state.branch_id}
			</div>
			<div>
				select cleaner. name: {state.worker} id: {state.worker_id}
			</div>
			<div>select date</div>
			<div>enter time</div>
			<div>enter duration</div>
			<div>any details</div>
			{data && <Modal isOpen={modal} toggle={toggle} data={data} />}
		</Container>
	);
};

export default Jobs;
