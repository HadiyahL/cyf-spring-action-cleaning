import React from "react";
import PropTypes from "prop-types";
import { Container } from "reactstrap";
import { ShowWorkersTable, AddNewButton } from "../components";

const ShowWorkers = ({ trigger }) => {
	return (
		<Container>
			<h2 className="text-center mt-4 mt-md-5 mb-5 mb-md-5">Cleaners</h2>
			<AddNewButton pathname="/add-worker" />
			<ShowWorkersTable trigger={trigger} />
		</Container>
	);
};

ShowWorkers.propTypes = {
	trigger: PropTypes.bool,
};

export default ShowWorkers;
