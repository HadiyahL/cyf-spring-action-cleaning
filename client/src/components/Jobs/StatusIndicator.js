import React from "react";
import PropTypes from "prop-types";
import SelectIcon from "../UI/SelectIcon";
import { determineJobStatus } from "../../util/helpers";
import Tooltip from "../UI/Tooltip";

const StatusIndicator = ({ status, date, index }) => {
	const jobStatus = determineJobStatus(status, date);
	let iconType;

	if (jobStatus === "Completed") {
		iconType = "success";
	} else if (jobStatus === "Awaiting") {
		iconType = "warning";
	} else {
		iconType = "danger";
	}

	return (
		<>
			<SelectIcon type={iconType} />
			<Tooltip id={`status-${index}`} text={jobStatus} />
		</>
	);
};

StatusIndicator.propTypes = {
	status: PropTypes.number,
	date: PropTypes.string,
	index: PropTypes.number,
};

export default StatusIndicator;
