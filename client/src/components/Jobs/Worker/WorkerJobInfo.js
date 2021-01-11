import React from "react";
import PropTypes from "prop-types";
import { formatDate } from "../../../util/helpers";

const WorkerJobInfo = ({
	address,
	contact_name,
	contact_phone,
	customer,
	details,
	duration,
	visit_time,
	visit_on,
}) => {
	return (
		<>
			<h1 className="text-center mt-4 mt-md-5">{customer}</h1>
			<h2 className="text-center">{address}</h2>
			<h2 className="text-center">
				{formatDate(visit_on, {
					weekday: "long",
					month: "long",
					day: "numeric",
				})}{" "}
				at {visit_time}
			</h2>
			<div className="my-4">
				<div>
					<strong>Contact:</strong> {contact_name}, {contact_phone}
				</div>
				{duration && (
					<div>
						<strong>Planned duration:</strong> {duration}{" "}
						{duration === 1 ? "hour" : "hours"}
					</div>
				)}
				{details && (
					<div>
						<strong>Job details:</strong> {details}
					</div>
				)}
			</div>
		</>
	);
};

WorkerJobInfo.propTypes = {
	address: PropTypes.string,
	contact_name: PropTypes.string,
	contact_phone: PropTypes.string,
	customer: PropTypes.string,
	details: PropTypes.string,
	duration: PropTypes.number,
	visit_time: PropTypes.string,
	visit_on: PropTypes.string,
};

export default WorkerJobInfo;
