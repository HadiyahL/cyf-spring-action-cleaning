import React from "react";
import PropTypes from "prop-types";

const Title = ({ text }) => {
	return <h2 className="text-center mt-4 mt-md-5 mb-5 mb-md-5">{text}</h2>;
};

Title.propTypes = {
	text: PropTypes.string.isRequired,
};

export default Title;
