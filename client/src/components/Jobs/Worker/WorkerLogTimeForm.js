import React, { useState } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { Form, FormGroup, FormText, Label, Input, Button } from "reactstrap";
import { putLogTimes } from "../../../service";
import BackButton from "../../UI/BackButton";
import useAuthorizationHeaders from "../../../hooks/useAuthorizationHeaders";

const WorkerLogTimeForm = ({ id, start_time, end_time, worker_feedback }) => {
	const [state, setState] = useState({
		startTime: start_time,
		endTime: end_time,
		feedback: worker_feedback,
		errors: {},
	});
	const history = useHistory();
	const authorizationHeaders = useAuthorizationHeaders();

	const handleChange = (e) => {
		const { value, name } = e.target;
		setState({
			...state,
			[name]: value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		putLogTimes(id, state, authorizationHeaders)
			.then((res) => {
				if (res.errors) {
					setState({
						...state,
						errors: formatErrors(res.errors),
					});
				} else {
					history.push("/jobs");
				}
			})
			.catch((e) => console.log("e", e));
	};

	const formatErrors = (errors) =>
		errors.reduce((acc, error) => {
			acc[error.param] = error.msg;
			return acc;
		}, {});

	const { startTime, endTime, feedback, errors } = state;

	return (
		<Form className="mb-5">
			<FormGroup>
				<Label for="startTime">Time when you started working</Label>
				<Input
					type="time"
					name="startTime"
					id="startTime"
					value={startTime}
					onChange={handleChange}
					invalid={!!errors.startTime}
					placeholder="HH:MM (24h clock)"
					pattern="^([0-1]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$"
				/>
				{errors.startTime && (
					<FormText color="danger">{errors.startTime}</FormText>
				)}
			</FormGroup>
			<FormGroup>
				<Label for="endTime">Time when you finished working</Label>
				<Input
					type="time"
					name="endTime"
					id="endTime"
					value={endTime}
					onChange={handleChange}
					invalid={!!errors.endTime}
					placeholder="HH:MM (24h clock)"
					pattern="^([0-1]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$"
				/>
				{errors.endTime && <FormText color="danger">{errors.endTime}</FormText>}
			</FormGroup>
			<FormGroup>
				<Label for="feedback">Details</Label>
				<Input
					type="textarea"
					name="feedback"
					id="feedback"
					placeholder="Any details about this particular job that Spring Action Cleaning should know."
					value={feedback}
					onChange={handleChange}
					rows={4}
				/>
			</FormGroup>
			<div className="d-flex justify-content-between">
				<Button onClick={handleSubmit}>Submit</Button>
				<BackButton />
			</div>
		</Form>
	);
};

WorkerLogTimeForm.propTypes = {
	id: PropTypes.string,
	start_time: PropTypes.string,
	end_time: PropTypes.string,
	worker_feedback: PropTypes.string,
};

export default WorkerLogTimeForm;
