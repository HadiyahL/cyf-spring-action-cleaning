import React, { useState } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
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
import { postWorkers, putWorkers } from "../service";
import useAuthorizationHeaders from "../hooks/useAuthorizationHeaders";
import BackButton from "./UI/BackButton";

const CreateWorkerForm = ({
	name,
	email,
	address,
	phone,
	whatsapp,
	contract,
	worker_id,
	languages,
}) => {
	const [state, setState] = useState({
		name: name || "",
		email: email || "",
		address: address || "",
		phone: phone || "",
		whatsapp: whatsapp || "",
		contract: contract || false,
		languages: languages || "",
	});
	const [errors, setErrors] = useState({});
	const history = useHistory();
	const authorizationHeaders = useAuthorizationHeaders();

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!worker_id) {
			postWorkers(state, authorizationHeaders)
				.then((res) => {
					if (res.errors) {
						setErrors(formatErrors(res.errors));
					} else {
						clearForm();
						history.push("/workers");
					}
				})
				.catch((e) => {
					console.error(e);
				});
		} else {
			putWorkers(worker_id, state, authorizationHeaders)
				.then((res) => {
					if (res.errors) {
						setErrors(formatErrors(res.errors));
					} else {
						history.push("/workers");
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
							invalid={!!errors.name}
							type="text"
							name="name"
							id="name"
							placeholder="Enter full name"
							onChange={handleChange}
							value={state.name}
							maxLength={100}
						/>
						{errors.name && <FormText color="danger">{errors.name}</FormText>}
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
						<Label for="address">Address</Label>
						<Input
							invalid={!!errors.address}
							type="text"
							name="address"
							id="address"
							placeholder="Enter address"
							onChange={handleChange}
							value={state.address}
							maxLength={100}
						/>
						{errors.address && (
							<FormText color="danger">{errors.address}</FormText>
						)}
					</FormGroup>
					<FormGroup>
						<Label for="languages">Main languages spoken</Label>
						<Input
							invalid={!!errors.languages}
							type="text"
							name="languages"
							id="languages"
							placeholder="French, Arabic, etc..."
							onChange={handleChange}
							value={state.languages}
							maxLength={50}
						/>
						{errors.languages && (
							<FormText color="danger">{errors.languages}</FormText>
						)}
					</FormGroup>
					<FormGroup>
						<Label for="phone">Phone Number</Label>
						<Input
							invalid={!!errors.phone}
							type="text"
							name="phone"
							id="phone"
							placeholder="Enter phone number"
							onChange={handleChange}
							value={state.phone}
							maxLength={50}
						/>
						{errors.phone && <FormText color="danger">{errors.phone}</FormText>}
					</FormGroup>
					<FormGroup>
						<Label for="whatsapp">Whatsapp Number</Label>
						<Input
							invalid={!!errors.whatsapp}
							type="text"
							name="whatsapp"
							id="whatsapp"
							placeholder="Enter whatsapp"
							onChange={handleChange}
							value={state.whatsapp}
							maxLength={50}
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

CreateWorkerForm.propTypes = {
	name: PropTypes.string,
	email: PropTypes.string,
	address: PropTypes.string,
	phone: PropTypes.string,
	whatsapp: PropTypes.string,
	contract: PropTypes.bool,
	worker_id: PropTypes.number,
	languages: PropTypes.string,
};

export default CreateWorkerForm;
