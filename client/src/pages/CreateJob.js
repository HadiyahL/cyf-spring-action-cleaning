import React, { useState } from "react";
import { Container, Form, Button } from "reactstrap";
import {
	SelectCustomer,
	SelectBranch,
	SelectWorker,
	SelectDate,
	SelectTime,
	SelectDuration,
	PayRateInput,
	DetailsInput,
	SelectStartTime,
	SelectEndTime,
} from "../components";
import SuccessAlert from "../components/UI/SuccessAlert";
import { postJob } from "../service";

const Jobs = () => {
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
		duration: "1",
		pay_rate: "",
	});
	const [errors, setErrors] = useState({});
	const [jobCreated, setJobCreated] = useState(false);

	const handleSubmit = (e) => {
		e.preventDefault();
		setJobCreated(false);
		postJob(state)
			.then((res) => {
				if (res.errors) {
					setErrors(formatErrors(res.errors));
				} else {
					setJobCreated(true);
					clearForm();
				}
			})
			.catch((err) => console.log(err));
	};

	const formatErrors = (errors) =>
		errors.reduce((acc, error) => {
			acc[error.param] = error.msg;
			return acc;
		}, {});

	const clearForm = () => {
		setState({
			customer: "",
			customer_id: "",
			branch: "",
			branch_id: "",
			worker: "",
			worker_id: "",
			details: "",
			visit_on: "",
			visit_time: "",
			duration: "1",
			pay_rate: "",
		});
		setErrors({});
	};

	return (
		<Container className="mb-5">
			{jobCreated && <SuccessAlert text="Job created successfully" />}
			<h2 className="text-center mt-4 mt-md-5 mb-5 mb-md-5">Create Job</h2>
			<Form onSubmit={handleSubmit}>
				<SelectCustomer
					state={state}
					setState={setState}
					error={errors.customer}
				/>
				<SelectBranch state={state} setState={setState} error={errors.branch} />
				<SelectWorker state={state} setState={setState} error={errors.worker} />
				<SelectDate state={state} setState={setState} error={errors.visit_on} />
				<SelectTime
					state={state}
					setState={setState}
					error={errors.visit_time}
				/>
				<SelectDuration
					state={state}
					setState={setState}
					error={errors.duration}
				/>
				<PayRateInput
					state={state}
					setState={setState}
					error={errors.pay_rate}
				/>
				<DetailsInput state={state} setState={setState} />
				<SelectStartTime
					state={state}
					setState={setState}
					error={errors.start_time}
				/>
				<SelectEndTime
					state={state}
					setState={setState}
					error={errors.end_time}
				/>
				<Button color="primary" size="lg">
					Create
				</Button>
			</Form>
		</Container>
	);
};

export default Jobs;
