import React from "react";
import { Container } from "reactstrap";
import { CreateCleanerForm } from "../components";
import "./CreateCleaner.css";

const CreateCleaner = () => {
	return (
		<Container>
			<h2 className="addcleaner-title mt-4 mt-md-5 mb-5 mb-md-5">
				Add a new cleaner
			</h2>
			<CreateCleanerForm />
		</Container>
	);
};

export default CreateCleaner;
