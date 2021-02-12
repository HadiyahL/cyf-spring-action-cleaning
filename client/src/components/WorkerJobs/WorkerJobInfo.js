import React from "react";
import PropTypes from "prop-types";
import { formatDate } from "../../util/helpers";

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
		<div className="mt-4 mt-md-5 mb-5">
			<p className="worker-info-text-size">
				<strong>Client:</strong> {customer}
			</p>
			<p className="worker-info-text-size">
				<strong>Address:</strong> {address}
			</p>
			<p className="worker-info-text-size">
				<strong>Date:</strong>{" "}
				{formatDate(visit_on, {
					weekday: "long",
					month: "long",
					day: "numeric",
				})}{" "}
				at {visit_time}
			</p>
			<p className="worker-info-text-size">
				<strong>Contact name: </strong>
				{contact_name}
			</p>
			<p className="worker-info-text-size">
				<strong>Contact phone: </strong>
				{contact_phone}
			</p>

			{duration && (
				<p className="worker-info-text-size">
					<strong>Planned duration:</strong> {duration}{" "}
					{duration === 1 ? "hour" : "hours"}
				</p>
			)}
			<p className="worker-info-text-size">
				<strong>Job details: </strong>
				{details}
			</p>
		</div>
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
