import React from "react";
import { Container } from "reactstrap";
import { CreateWorkerForm, Title } from "../components";

const CreateWorker = () => {
	return (
		<Container>
			<Title text="Add a new cleaner" />
			<CreateWorkerForm />
		</Container>
	);
};

export default CreateWorker;
