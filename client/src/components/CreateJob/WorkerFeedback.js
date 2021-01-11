import React from "react";
import PropTypes from "prop-types";

const WorkerFeedback = ({ feedback }) => {
	if (!feedback) {
		return null;
	}

	return (
		<div>
			<p className="worker-feedback-title">Worker&apos;s message</p>
			<p>{feedback}</p>
		</div>
	);
};

WorkerFeedback.propTypes = {
	feedback: PropTypes.string,
};

export default WorkerFeedback;
