import React from "react";
import SelectIcon from "../UI/SelectIcon";
import { determineJobStatus } from "../../util/helpers";

const StatusIndicator = ({ status, date }) => {
	const jobStatus = determineJobStatus(status, date);

	if (jobStatus === "completed") {
		return <SelectIcon type="success" />;
	} else if (jobStatus === "awaiting") {
		return <SelectIcon type="warning" />;
	} else {
		return <SelectIcon type="danger" />;
	}
};

export default StatusIndicator;
