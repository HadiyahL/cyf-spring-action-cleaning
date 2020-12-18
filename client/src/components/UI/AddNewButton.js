import React from "react";
import PropTypes from "prop-types";
import { Button } from "reactstrap";
import { useHistory } from "react-router-dom";

const AddNewButton = ({ pathname }) => {
	const history = useHistory();

	const handleClick = () => {
		history.push(pathname);
	};
	return (
		<div className="d-flex justify-content-end mb-4">
			<Button onClick={handleClick} color="success">
				Add new
			</Button>
		</div>
	);
};

AddNewButton.propTypes = {
	pathname: PropTypes.string,
};

export default AddNewButton;
