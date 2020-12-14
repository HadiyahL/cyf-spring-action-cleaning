import React, { useState } from "react";
import { Button, Form, FormGroup, FormText, Label, Input, Row, Col } from "reactstrap";
import { postCustomer } from "../service";

const CreateCustomerForm = () => {
	const [state, setState] = useState({
		name: "",
		email: "",
		phone: "",
	});
	const [errors, setErrors] = useState({});

	const handleSubmit = (e) => {
		e.preventDefault();

		postCustomer(state)
			.then((res) => {
				if (res.errors) {
					setErrors(formatErrors(res.errors));
				} else {
					clearForm();
				}
			})
			.catch((e) => {
				console.error(e);
			});
	};

	const formatErrors = (errors) =>
		errors.reduce((acc, error) => {
			acc[error.param] = error.msg;
			return acc;
		}, {});

	const clearForm = () => {
		setState({
			name: "",
			email: "",
			phone: "",
		});
		setErrors({});
	};

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
						{errors.name && <FormText color="danger">{errors.name}</FormText>}
					</FormGroup>
					<FormGroup>
						<Label for="phone">Phone Number</Label>
						<Input
							type="text"
							name="phone"
							id="phone"
							placeholder="Enter Phone Number"
							onChange={handleChange}
							value={state.phone}
						/>
						{errors.name && <FormText color="danger">{errors.name}</FormText>}
					</FormGroup>
					<Button color="primary">Submit</Button>
				</Form>
			</Col>
		</Row>
	);
};

export default CreateCustomerForm;
