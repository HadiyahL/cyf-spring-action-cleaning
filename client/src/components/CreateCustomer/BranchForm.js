import React, { useState } from "react";
import PropTypes from "prop-types";
import {
	Button,
	Form,
	FormGroup,
	FormText,
	Label,
	Input,
	Row,
	Col,
} from "reactstrap";
import { postBranch, putBranch } from "../../service";
import SelectWorker from "../CreateJob/SelectWorker";

const BranchForm = ({
	state,
	setState,
	toggle,
	branchSaved,
	setBranchSaved,
}) => {
	const {
		main_branch_id,
		main_branch,
		branch_id,
		customer_id,
		address,
		contact_name,
		contact_phone,
		visit_time,
		duration,
		details,
	} = state;
	const [errors, setErrors] = useState({});
	const [mainBranchState, setMainBranchState] = useState(
		main_branch_id === branch_id
	);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!branch_id) {
			postBranch(customer_id, state)
				.then((res) => {
					if (res.errors) {
						setErrors(formatErrors(res.errors));
					} else {
						if (main_branch) {
							// but set new default branch
							clearBranchFieldsFromState(res.id);
						} else {
							clearBranchFieldsFromState();
						}
						// trigger BranchesTable update
						setBranchSaved(!branchSaved);
						toggle();
					}
				})
				.catch((e) => {
					console.error(e);
				});
		} else {
			putBranch(branch_id, customer_id, state)
				.then((res) => {
					if (res.errors) {
						setErrors(formatErrors(res.errors));
					} else {
						if (main_branch) {
							clearBranchFieldsFromState(branch_id);
						} else {
							clearBranchFieldsFromState();
						}
						// trigger BranchesTable update
						setBranchSaved(!branchSaved);
						toggle();
					}
				})
				.catch((e) => {
					console.error(e);
				});
		}
	};

	const formatErrors = (errors) =>
		errors.reduce((acc, error) => {
			acc[error.param] = error.msg;
			return acc;
		}, {});

	const clearBranchFieldsFromState = (mainBranchId) => {
		setState({
			...state,
			address: "",
			duration: "1",
			contact_name: "",
			visit_time: undefined,
			details: "",
			contact_phone: "",
			branch_id: null,
			worker_id: null,
			main_branch_id: mainBranchId ?? main_branch_id,
		});
		setErrors({});
	};

	const handleChange = (e) => {
		const { name, value, type } = e.target;
		if (type === "checkbox") {
			setMainBranchState(!mainBranchState);
			setState({ ...state, [name]: !mainBranchState });
		} else {
			setState({ ...state, [name]: value });
		}
	};

	return (
		<Row className="justify-content-center">
			<Col xs="12" sm="12" md="8" lg="6" xl="6">
				<Form onSubmit={handleSubmit}>
					<FormGroup>
						<Label for="address">Address</Label>
						<Input
							type="text"
							name="address"
							id="address"
							placeholder="Enter address"
							onChange={handleChange}
							value={address}
						/>
						{errors.address && (
							<FormText color="danger">{errors.address}</FormText>
						)}
					</FormGroup>
					<FormGroup check>
						<Label check>
							<Input
								name="main_branch"
								type="checkbox"
								onChange={handleChange}
								checked={mainBranchState}
							/>
							Set as a main address
						</Label>
					</FormGroup>
					<FormGroup>
						<Label for="contact_name">Name</Label>
						<Input
							type="text"
							name="contact_name"
							id="contact_name"
							placeholder="Enter contact name"
							onChange={handleChange}
							value={contact_name}
						/>
						{errors.contact_name && (
							<FormText color="danger">{errors.contact_name}</FormText>
						)}
					</FormGroup>
					<FormGroup>
						<Label for="phone">Phone Number</Label>
						<Input
							type="text"
							name="contact_phone"
							id="phone"
							placeholder="Enter Phone Number"
							onChange={handleChange}
							value={contact_phone}
						/>
						{errors.contact_phone && (
							<FormText color="danger">{errors.contact_phone}</FormText>
						)}
					</FormGroup>
					<FormGroup>
						<Label for="visit_time">Default visit time</Label>
						<Input
							// invalid={!!error}
							type="time"
							name="visit_time"
							id="visit_time"
							value={visit_time || ""}
							onChange={handleChange}
							placeholder="HH:MM (24h clock)"
							pattern="^([0-1]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$"
						/>
						{errors.visit_time && (
							<FormText color="danger">{errors.visit_time}</FormText>
						)}
					</FormGroup>
					<FormGroup>
						<Label for="duration">Default duration of visit</Label>
						<Input
							// invalid={!!error}
							type="select"
							name="duration"
							id="duration"
							onChange={handleChange}
							value={duration}
						>
							<option value="1">1 hour</option>
							<option value="2">2 hours</option>
							<option value="3">3 hours</option>
							<option value="4">4 hours</option>
							<option value="5">5 hours</option>
							<option value="6">6 hours</option>
							<option value="7">7 hours</option>
							<option value="8">8 hours</option>
							<option value="9">9 hours</option>
							<option value="10">10 hours</option>
						</Input>
						{errors.duration && (
							<FormText color="danger">{errors.duration}</FormText>
						)}
					</FormGroup>
					<FormGroup>
						<Label for="details">Details</Label>
						<Input
							name="details"
							id="details"
							placeholder="Enter additional information"
							onChange={handleChange}
							value={details}
							type="textarea"
							rows={4}
						/>
						{errors.details && (
							<FormText color="danger">{errors.details}</FormText>
						)}
					</FormGroup>
					<SelectWorker state={state} setState={setState} />
					<Button color="primary">{branch_id ? "Edit" : "Save"}</Button>
				</Form>
			</Col>
		</Row>
	);
};

BranchForm.propTypes = {
	state: PropTypes.object.isRequired,
	setState: PropTypes.func.isRequired,
	toggle: PropTypes.func,
	branchSaved: PropTypes.bool,
	setBranchSaved: PropTypes.func,
};

export default BranchForm;
