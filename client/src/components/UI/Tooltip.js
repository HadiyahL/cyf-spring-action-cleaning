import React, { useState } from "react";
import PropTypes from "prop-types";
import { Tooltip } from "reactstrap";

const TooltipComponent = ({ id, text }) => {
	const [tooltipOpen, setTooltipOpen] = useState(false);

	const toggle = () => setTooltipOpen((state) => !state);

	return (
		<Tooltip placement="top" isOpen={tooltipOpen} target={id} toggle={toggle}>
			{text}
		</Tooltip>
	);
};

TooltipComponent.propTypes = {
	id: PropTypes.string,
	text: PropTypes.string,
};

export default TooltipComponent;
