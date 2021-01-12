import React from "react";
import PropTypes from "prop-types";
import { Container } from "reactstrap";
import { ShowWorkersTable, AddNewButton, Title } from "../components";

const ShowWorkers = ({ trigger }) => {
	return (
		<Container>
			<Title text="Cleaners" />
			<AddNewButton pathname="/add-worker" />
			<ShowWorkersTable trigger={trigger} />
		</Container>
	);
};

ShowWorkers.propTypes = {
	trigger: PropTypes.bool,
};

export default ShowWorkers;
