import React, { useState } from "react";
import PropTypes from "prop-types";
import { Popover, PopoverBody } from "reactstrap";
import InfoIcon from "../UI/InfoIcon";

const InfoPopover = ({ name }) => {
	const [popoverOpen, setPopoverOpen] = useState(false);

	const toggle = () => setPopoverOpen(!popoverOpen);

	return (
		<span>
			<span id={name} className="d-inline">
				<InfoIcon />
			</span>
			<Popover
				trigger="hover"
				placement="bottom"
				isOpen={popoverOpen}
				target={name}
				toggle={toggle}
			>
				<PopoverBody>
					This field should be completed only if the cleaner is unable to log
					time.
				</PopoverBody>
			</Popover>
		</span>
	);
};

InfoPopover.propTypes = {
	name: PropTypes.string,
};

export default InfoPopover;
