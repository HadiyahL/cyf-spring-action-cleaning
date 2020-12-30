import React, { useState } from "react";
import { DateTime } from "luxon";
import { getJobs } from "../service";
import useFetch from "../hooks/useFetch";

const Recurring = () => {
	// const { loading, data, error } = useFetch("/jobs/range", data);
	const [jobs, setJobs] = useState([]);
	const getWeekFromDate = (date = new Date()) => {
		const startOfWeek = DateTime.fromJSDate(date)
			.minus({ days: 7 })
			.startOf("week")
			.toISODate();
		const endOfWeek = DateTime.fromJSDate(date)
			.minus({ days: 7 })
			.endOf("week")
			.toISODate();

		return {
			startOfWeek,
			endOfWeek,
		};
	};

	const handleClick = () => {
		getJobs(getWeekFromDate().startOfWeek, getWeekFromDate().endOfWeek)
			.then((res) => {
				console.log("res.jobs :>> ", res.jobs);
				setJobs(res.jobs);
			})
			.catch((e) => console.log(e));
	};

	return (
		<div>
			<div>weeks range below</div>
			<div>week start: {getWeekFromDate().startOfWeek}</div>
			<div>week end: {getWeekFromDate().endOfWeek}</div>
			<div>all jobs for that range below</div>
			<button onClick={handleClick}>on this button click</button>
			<ul>
				{jobs.map((job) => (
					<li key={job.id}>
						{job.visit_on.split("T")[0]} {job.address} {job.customer}{" "}
						{job.worker}
					</li>
				))}
			</ul>
		</div>
	);
};

export default Recurring;
