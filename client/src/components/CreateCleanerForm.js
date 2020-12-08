import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input, Row, Col } from "reactstrap";
import { postCleaner } from "../service";
import "./CreateCleanerForm.css";

const CreateCleanerForm = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [address, setAddress] = useState("");
	const [phone, setPhone] = useState("");
	const [whatsapp, setWhatsapp] = useState("");
	const [contract, setContract] = useState(false);

	const handleSubmit = (e) => {
		e.preventDefault();
		const data = { name, email, address, phone, whatsapp, contract };

		postCleaner(data)
			.then((res) => {
				if (res.errors) {
					console.log(res.errors);
				} else {
					clearForm();
				}
			})
			.catch((e) => {
				console.error(e);
			});
	};

	const clearForm = () => {
		setName("");
		setEmail("");
		setAddress("");
		setPhone("");
		setWhatsapp("");
		setContract(false);
	};

	const handleName = (e) => {
		const { value } = e.target;
		setName(value);
	};

	const handleEmail = (e) => {
		const { value } = e.target;
		setEmail(value);
	};

	const handleAddress = (e) => {
		const { value } = e.target;
		setAddress(value);
	};

	const handlePhone = (e) => {
		const { value } = e.target;
		setPhone(value);
	};
	const handleWhatsapp = (e) => {
		const { value } = e.target;
		setWhatsapp(value);
	};
	const handleContract = () => {
		setContract(!contract);
	};

	return (
		<Row className="justify-content-center">
			<Col xs="12" sm="12" md="8" lg="6" xl="6">
				<Form onSubmit={handleSubmit} className="create-cleaner-form">
					<FormGroup>
						<Label for="name">Name</Label>
						<Input
							type="text"
							name="name"
							id="name"
							placeholder="Enter full name"
							onChange={handleName}
							value={name}
						/>
					</FormGroup>
					<FormGroup>
						<Label for="email">Email</Label>
						<Input
							type="email"
							name="email"
							id="email"
							placeholder="Enter email"
							onChange={handleEmail}
							value={email}
						/>
					</FormGroup>
					<FormGroup>
						<Label for="address">Address</Label>
						<Input
							type="text"
							name="address"
							id="address"
							placeholder="Enter address"
							onChange={handleAddress}
							value={address}
						/>
					</FormGroup>
					<FormGroup>
						<Label for="phone">Phone Number</Label>
						<Input
							type="text"
							name="phone"
							id="phone"
							placeholder="Enter phone number"
							onChange={handlePhone}
							value={phone}
						/>
					</FormGroup>
					<FormGroup>
						<Label for="whatsapp">Whatsapp Number</Label>
						<Input
							type="text"
							name="whatsapp"
							id="whatsapp"
							placeholder="Enter whatsapp"
							onChange={handleWhatsapp}
							value={whatsapp}
						/>
					</FormGroup>

					<FormGroup check className="mb-4">
						<Label check>
							<Input
								type="checkbox"
								onChange={handleContract}
								checked={contract}
							/>{" "}
							Permanent contact
						</Label>
					</FormGroup>
					<Button color="primary">Submit</Button>
				</Form>
			</Col>
		</Row>
	);
};

export default CreateCleanerForm;
