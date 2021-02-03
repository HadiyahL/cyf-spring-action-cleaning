import React, { useState } from "react";
import PropTypes from "prop-types";
import { useMutation, useQueryClient } from "react-query";
import {
	Button,
	Form,
	FormGroup,
	FormText,
	Label,
	Input,
	Row,
	Col,
	CustomInput,
} from "reactstrap";
import { postCustomer, putCustomer } from "../../service";
import useAuthorizationHeaders from "../../hooks/useAuthorizationHeaders";
import SuccessAlert from "../UI/SuccessAlert";
import BackButton from "../UI/BackButton";

const CreateCustomerForm = ({ state, setState }) => {
	const [errors, setErrors] = useState({});
	const [isAlertOpen, setIsAlertOpen] = useState(false);
	const authorizationHeaders = useAuthorizationHeaders();

	const createCustomerMutation = useMutation(
		({ data, options }) => postCustomer(data, options),
		{
			onError: (error) => {
				console.log(error);
			},
			onSuccess: (data) => {
				if (data.errors) {
					setErrors(formatErrors(data.errors));
				} else {
					setErrors({});
					setState({
						...state,
						customer_id: data.id,
					});
					setIsAlertOpen(true);
				}
			},
		}
	);

	const queryClient = useQueryClient();

	const updateCustomerMutation = useMutation(
		({ id, data, options }) => putCustomer(id, data, options),
		{
			onError: (error) => {
				console.log(error);
			},
			onSuccess: (data, { id }) => {
				if (data.errors) {
					setErrors(formatErrors(data.errors));
				} else {
					queryClient.setQueryData(`/customers/${id}`, (oldData) => ({
						...oldData,
						data,
					}));
					setErrors({});
					setIsAlertOpen(true);
				}
			},
		}
	);

	const handleSubmit = (e) => {
		e.preventDefault();

		if (!state.customer_id) {
			createCustomerMutation.mutate({
				data: state,
				options: authorizationHeaders,
			});
		} else {
			updateCustomerMutation.mutate({
				id: state.customer_id,
				data: state,
				options: authorizationHeaders,
			});
		}
	};

	const formatErrors = (errors) =>
		errors.reduce((acc, error) => {
			acc[error.param] = error.msg;
			return acc;
		}, {});

	const handleChange = (e) => {
		const { name, value, checked, type } = e.target;

		if (type === "checkbox") {
			setState({ ...state, [name]: checked });
		} else {
			setState({ ...state, [name]: value });
		}
	};

	return (
		<Row className="justify-content-center">
			<Col xs="12" sm="12" md="8" lg="6" xl="6">
				{isAlertOpen && (
					<SuccessAlert
						text="Client details successfully updated"
						resetAlert={setIsAlertOpen}
					/>
				)}
				<Form onSubmit={handleSubmit}>
					<FormGroup className="mb-0 d-flex justify-content-end user-select-none">
						<Label check for="archived">
							<CustomInput
								type="switch"
								id="archived"
								name="archived"
								label="Archived"
								onChange={handleChange}
								checked={state.archived}
							/>
						</Label>
					</FormGroup>
					<FormGroup>
						<Label for="name">Name</Label>
						<Input
							invalid={!!errors.name}
							type="text"
							name="name"
							id="name"
							placeholder="Enter name"
							onChange={handleChange}
							value={state.name}
							maxLength={100}
						/>
						{errors.name && <FormText color="danger">{errors.name}</FormText>}
					</FormGroup>
					<FormGroup>
						<Label for="customer_contact_name">Contact name</Label>
						<Input
							invalid={!!errors.customer_contact_name}
							type="text"
							name="customer_contact_name"
							id="customer_contact_name"
							placeholder="Enter contact name"
							onChange={handleChange}
							value={state.customer_contact_name}
							maxLength={100}
						/>
						{errors.customer_contact_name && (
							<FormText color="danger">{errors.customer_contact_name}</FormText>
						)}
					</FormGroup>
					<FormGroup>
						<Label for="email">Email</Label>
						<Input
							invalid={!!errors.email}
							type="email"
							name="email"
							id="email"
							placeholder="Enter email"
							onChange={handleChange}
							value={state.email}
							maxLength={60}
						/>
						{errors.email && <FormText color="danger">{errors.email}</FormText>}
					</FormGroup>
					<FormGroup>
						<Label for="customerPhone">Phone Number</Label>
						<Input
							invalid={!!errors.phone_number}
							type="text"
							name="phone_number"
							id="customerPhone"
							placeholder="Enter Phone Number"
							onChange={handleChange}
							value={state.phone_number}
							maxLength={50}
						/>
						{errors.phone_number && (
							<FormText color="danger">{errors.phone_number}</FormText>
						)}
					</FormGroup>
					<div className="d-flex justify-content-end mb-4">
						<BackButton />
						<Button type="submit" className="ml-4">
							Save
						</Button>
					</div>
				</Form>
			</Col>
		</Row>
	);
};

CreateCustomerForm.propTypes = {
	state: PropTypes.object.isRequired,
	setState: PropTypes.func.isRequired,
};

export default CreateCustomerForm;
