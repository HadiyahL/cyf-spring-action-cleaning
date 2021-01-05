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
import { postCustomer, putCustomer } from "../../service";
import useAuthorizationHeaders from "../../hooks/useAuthorizationHeaders";

const CreateCustomerForm = ({ state, setState }) => {
	const [errors, setErrors] = useState({});
	const authorizationHeaders = useAuthorizationHeaders();

	const handleSubmit = (e) => {
		e.preventDefault();

		if (!state.customer_id) {
			postCustomer(state, authorizationHeaders)
				.then((res) => {
					if (res.errors) {
						setErrors(formatErrors(res.errors));
					} else {
						setErrors({});
						setState({
							...state,
							customer_id: res.id,
						});
					}
				})
				.catch((e) => {
					console.error(e);
				});
		} else {
			putCustomer(state.customer_id, state, authorizationHeaders)
				.then((res) => {
					if (res.errors) {
						setErrors(formatErrors(res.errors));
					} else {
						setErrors({});
						setState({
							...state,
						});
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

	const handleChange = (e) => {
		const { name, value } = e.target;
		setState({ ...state, [name]: value });
	};

	return (
		<Row className="justify-content-center">
			<Col xs="12" sm="12" md="8" lg="6" xl="6">
				<Form onSubmit={handleSubmit}>
					<FormGroup>
						<Label for="name">Name</Label>
						<Input
							type="text"
							name="name"
							id="name"
							placeholder="Enter name"
							onChange={handleChange}
							value={state.name}
						/>
						{errors.name && <FormText color="danger">{errors.name}</FormText>}
					</FormGroup>
					<FormGroup>
						<Label for="email">Email</Label>
						<Input
							type="email"
							name="email"
							id="email"
							placeholder="Enter email"
							onChange={handleChange}
							value={state.email}
						/>
						{errors.email && <FormText color="danger">{errors.email}</FormText>}
					</FormGroup>
					<FormGroup>
						<Label for="customerPhone">Phone Number</Label>
						<Input
							type="text"
							name="phone_number"
							id="customerPhone"
							placeholder="Enter Phone Number"
							onChange={handleChange}
							value={state.phone_number}
						/>
						{errors.phone_number && (
							<FormText color="danger">{errors.phone_number}</FormText>
						)}
					</FormGroup>
					<Button>{state.customer_id ? "Edit" : "Save"}</Button>
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
