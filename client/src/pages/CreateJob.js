import React, { useState } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
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
import { postJobs, putJobs } from "../service";
import useAuthorizationHeaders from "../hooks/useAuthorizationHeaders";

const Jobs = ({
	customer,
	customer_id,
	branch,
	branch_id,
	worker,
	worker_id,
	details,
	visit_on,
	visit_time,
	duration,
	pay_rate,
	start_time,
	end_time,
	job_id,
}) => {
	const [state, setState] = useState({
		customer: customer || "",
		customer_id: customer_id || "",
		branch: branch || "",
		branch_id: branch_id || "",
		worker: worker || "",
		worker_id: worker_id || "",
		details: details || "",
		visit_on: visit_on || "",
		visit_time: visit_time || "",
		duration: duration || "1",
		pay_rate: pay_rate || "",
		start_time: start_time || "",
		end_time: end_time || "",
	});
	const [errors, setErrors] = useState({});
	const history = useHistory();
	const authorizationHeaders = useAuthorizationHeaders();

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!job_id) {
			postJobs(state, authorizationHeaders)
				.then((res) => {
					if (res.errors) {
						setErrors(formatErrors(res.errors));
					} else {
						clearForm();
						history.push("/jobs");
					}
				})
				.catch((err) => console.log(err));
		} else {
			putJobs(job_id, state, authorizationHeaders)
				.then((res) => {
					if (res.errors) {
						setErrors(formatErrors(res.errors));
					} else {
						history.push("/jobs");
					}
				})
				.catch((err) => console.log(err));
		}
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
			start_time: "",
			end_time: "",
		});
		setErrors({});
	};

	return (
		<Container className="mb-5">
			<h2 className="text-center mt-4 mt-md-5 mb-5 mb-md-5">
				{job_id ? "Edit Job" : "Create Job"}
			</h2>
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
					{job_id ? "Update" : "Create"}
				</Button>
			</Form>
		</Container>
	);
};

Jobs.propTypes = {
	customer: PropTypes.string,
	customer_id: PropTypes.number,
	branch: PropTypes.string,
	branch_id: PropTypes.number,
	worker: PropTypes.string,
	worker_id: PropTypes.number,
	details: PropTypes.string,
	visit_on: PropTypes.string,
	visit_time: PropTypes.string,
	duration: PropTypes.number,
	pay_rate: PropTypes.number,
	start_time: PropTypes.string,
	end_time: PropTypes.string,
	job_id: PropTypes.number,
};

export default Jobs;
