import React, { useState } from "react";
import {
	Button,
	Form,
	FormText,
	FormGroup,
	Label,
	Input,
	Row,
	Col,
} from "reactstrap";
import { postCleaner } from "../service";

const CreateCleanerForm = () => {
	const [state, setState] = useState({
		name: "",
		email: "",
		address: "",
		phone: "",
		whatsapp: "",
		contract: false,
	});
	const [errors, setErrors] = useState({});

	const handleSubmit = (e) => {
		e.preventDefault();

		postCleaner(state)
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
			address: "",
			phone: "",
			whatsapp: "",
			contract: false,
		});
		setErrors({});
	};

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
				<Form onSubmit={handleSubmit}>
					<FormGroup>
						<Label for="name">Name</Label>
						<Input
							type="text"
							name="name"
							id="name"
							placeholder="Enter full name"
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
						<Label for="address">Address</Label>
						<Input
							type="text"
							name="address"
							id="address"
							placeholder="Enter address"
							onChange={handleChange}
							value={state.address}
						/>
						{errors.address && (
							<FormText color="danger">{errors.address}</FormText>
						)}
					</FormGroup>
					<FormGroup>
						<Label for="phone">Phone Number</Label>
						<Input
							type="text"
							name="phone"
							id="phone"
							placeholder="Enter phone number"
							onChange={handleChange}
							value={state.phone}
						/>
						{errors.phone && <FormText color="danger">{errors.phone}</FormText>}
					</FormGroup>
					<FormGroup>
						<Label for="whatsapp">Whatsapp Number</Label>
						<Input
							type="text"
							name="whatsapp"
							id="whatsapp"
							placeholder="Enter whatsapp"
							onChange={handleChange}
							value={state.whatsapp}
						/>
						{errors.whatsapp && (
							<FormText color="danger">{errors.whatsapp}</FormText>
						)}
					</FormGroup>
					<FormGroup check className="mb-4">
						<Label check>
							<Input
								name="contract"
								type="checkbox"
								onChange={handleChange}
								checked={state.contract}
							/>{" "}
							Permanent contract
						</Label>
					</FormGroup>
					<Button color="primary">Submit</Button>
				</Form>
			</Col>
		</Row>
	);
};

export default CreateCleanerForm;
