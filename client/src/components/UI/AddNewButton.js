import React from "react";
import PropTypes from "prop-types";
import { Button } from "reactstrap";
import { useHistory } from "react-router-dom";

const AddNewButton = ({ pathname, text = "Add new" }) => {
	const history = useHistory();

	const handleClick = () => {
		history.push(pathname);
	};
	return (
		<div className="d-flex justify-content-end mb-4">
			<Button onClick={handleClick}>{text}</Button>
		</div>
	);
};

AddNewButton.propTypes = {
	pathname: PropTypes.string,
	text: PropTypes.string,
};

export default AddNewButton;
