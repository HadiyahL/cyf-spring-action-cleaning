import React from "react";
import PropTypes from "prop-types";
import { Button, Input } from "reactstrap";
import { plusDayForJob, minusDayForJob } from "../../util/helpers";
import ChangeWorkerButton from "./ChangeWorkerButton";
import PlusIcon from "../UI/PlusIcon";
import MinusIcon from "../UI/MinusIcon";
import { formatDate } from "../../util/helpers";

const RecurringJobsTableBody = ({ data, state, setState }) => {
	const handleRemoveJob = (idToRemove) => {
		setState({
			...state,
			jobs: state.jobs.filter(({ id }) => id !== idToRemove),
		});
	};

	const handlePlusDay = (id) => {
		setState({
			...state,
			jobs: plusDayForJob(state.jobs, id),
		});
	};

	const handleMinusDay = (id) => {
		setState({
			...state,
			jobs: minusDayForJob(state.jobs, id),
		});
	};

	const handleTimeChange = (e, id) => {
		setState({
			...state,
			jobs: state.jobs.map((job) => {
				if (job.id === id) {
					job.visit_time = e.target.value;
				}
				return job;
			}),
		});
	};

	return (
		<tbody>
			{data.map(({ id, customer, address, worker, visit_on, visit_time }) => (
				<tr key={id}>
					<td className="align-middle">{customer}</td>
					<td className="align-middle">{address}</td>
					<td className="align-middle">
						{state.workers ? (
							<ChangeWorkerButton
								state={state}
								setState={setState}
								id={id}
								text={worker}
							/>
						) : (
							worker
						)}
					</td>
					<td className="align-middle">
						<Button
							onClick={() => handleMinusDay(id)}
							className="mr-2"
							title="Previous day"
							aria-label="Previous day"
						>
							<MinusIcon />
						</Button>
						<div className="d-inline-block text-center next-cleaning-date">
							{formatDate(visit_on, {
								weekday: "short",
								year: "numeric",
								month: "short",
								day: "numeric",
							})}
						</div>
						<Button
							onClick={() => handlePlusDay(id)}
							className="ml-2"
							title="Next day"
							aria-label="Next day"
						>
							<PlusIcon />
						</Button>
					</td>
					<td className="align-middle">
						<Input
							type="time"
							name="time"
							id="time"
							value={visit_time}
							onChange={(e) => handleTimeChange(e, id)}
							placeholder="HH:MM (24h clock)"
							pattern="^([0-1]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$"
							className="time-input"
						/>
					</td>
					<td className="align-middle">
						<Button
							close
							aria-label="Remove"
							title="Remove"
							onClick={() => handleRemoveJob(id)}
							className="mx-auto"
						/>
					</td>
				</tr>
			))}
		</tbody>
	);
};

RecurringJobsTableBody.propTypes = {
	data: PropTypes.array,
	state: PropTypes.object,
	setState: PropTypes.func,
};

export default RecurringJobsTableBody;
