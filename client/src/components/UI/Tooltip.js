import React, { useState } from "react";
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

export default TooltipComponent;
