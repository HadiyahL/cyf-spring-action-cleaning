import React from "react";
import { Container } from "reactstrap";
import { ShowWorkersForm } from "../components";

const ShowWorkers = ({ trigger }) => {
	return (
		<Container>
			<h2 className="text-center mt-4 mt-md-5 mb-5 mb-md-5">
				Cleaners
			</h2>
			<ShowWorkersForm  trigger={trigger} />
		</Container>
	);
};

export default ShowWorkers;