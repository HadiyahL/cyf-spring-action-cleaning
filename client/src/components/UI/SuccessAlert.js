import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { UncontrolledAlert } from "reactstrap";

const SuccessAlert = ({ text }) => {
	useEffect(() => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	}, []);

	return <UncontrolledAlert color="success">{text}</UncontrolledAlert>;
};

SuccessAlert.propTypes = {
	text: PropTypes.string.isRequired,
};

export default SuccessAlert;
