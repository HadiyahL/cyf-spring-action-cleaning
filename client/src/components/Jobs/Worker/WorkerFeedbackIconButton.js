import React, { useState } from "react";
import PropTypes from "prop-types";
import WorkerFeedbackModal from "./WorkerFeedbackModal";
import TextIcon from "../../UI/TextIcon";

const WorkerFeedbackIconButton = ({ feedback, worker }) => {
	const [isOpen, setIsOpen] = useState(false);

	const toggle = () => {
		setIsOpen((state) => !state);
	};

	const handleFeedbackIconClick = (e) => {
		e.stopPropagation();
		toggle();
	};

	return (
		<button
			className="border-0 bg-transparent"
			onClick={(e) => handleFeedbackIconClick(e)}
			ariaLabel="Worker Feedback Icon"
			title="Feedback message"
		>
			<TextIcon />
			<WorkerFeedbackModal
				isOpen={isOpen}
				toggle={toggle}
				feedback={feedback}
				worker={worker}
			/>
		</button>
	);
};

WorkerFeedbackIconButton.propTypes = {
	feedback: PropTypes.string,
	worker: PropTypes.string,
};

export default WorkerFeedbackIconButton;
