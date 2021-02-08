import React from "react";
import PropTypes from "prop-types";
import { FormGroup, Label, Input } from "reactstrap";
import { sortByField } from "../../util/helpers";

const WorkerFilter = ({ state, setState, workers }) => {
	const handleWorkerChange = (e) => {
		const { value } = e.target;
		const { originalJobs } = state;

		if (value === "all") {
			setState({
				...state,
				jobs: originalJobs,
				selectedWorker: value,
			});
		} else {
			setState({
				...state,
				jobs: originalJobs.filter(({ worker }) => worker === value),
				selectedWorker: value,
			});
		}
	};

	const sortedWorkers = sortByField(workers, "name", true);

	if (sortedWorkers.length < 1) {
		return null;
	} else {
		return (
			<FormGroup>
				<Label for="workers" hidden>
					Select worker
				</Label>
				<Input
					type="select"
					name="workers"
					id="workers"
					onChange={handleWorkerChange}
				>
					<option value="all">All</option>
					{sortedWorkers.map((worker, id) => (
						<option key={id} value={worker.name}>
							{worker.name}
						</option>
					))}
				</Input>
			</FormGroup>
		);
	}
};

WorkerFilter.propTypes = {
	state: PropTypes.object.isRequired,
	setState: PropTypes.func.isRequired,
	workers: PropTypes.array.isRequired,
};

export default WorkerFilter;
