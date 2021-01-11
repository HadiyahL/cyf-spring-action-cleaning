import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Alert } from "reactstrap";

const SuccessAlert = ({ text, resetAlert }) => {
	const [visible, setVisible] = useState(true);

	const onDismiss = () => setVisible(false);

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: "smooth" });
		setTimeout(() => {
			setVisible(false);
			resetAlert(false);
		}, 4000);
	}, [resetAlert]);

	return (
		<Alert color="success" isOpen={visible} toggle={onDismiss}>
			{text}
		</Alert>
	);
};

SuccessAlert.propTypes = {
	text: PropTypes.string.isRequired,
	resetAlert: PropTypes.func,
};

export default SuccessAlert;
