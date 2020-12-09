import React from "react";
import { Container } from "reactstrap";
import { CreateWorkerForm } from "../components";

const CreateWorker = () => {
	return (
		<Container>
			<h2 className="text-center mt-4 mt-md-5 mb-5 mb-md-5">
				Add a new cleaner
			</h2>
			<CreateWorkerForm />
		</Container>
	);
};

export default CreateWorker;
