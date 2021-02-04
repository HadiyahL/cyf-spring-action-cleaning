import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import {
	Form,
	FormGroup,
	FormText,
	Label,
	Input,
	Button,
	Alert,
} from "reactstrap";
import { putLogTimes } from "../../../service";
import BackButton from "../../UI/BackButton";
import useAuthorizationHeaders from "../../../hooks/useAuthorizationHeaders";

const WorkerLogTimeForm = ({
	id,
	start_time,
	end_time,
	worker_feedback,
	status,
}) => {
	const [state, setState] = useState({
		startTime: start_time,
		endTime: end_time,
		feedback: worker_feedback,
		errors: {},
	});
	const history = useHistory();
	const authorizationHeaders = useAuthorizationHeaders();
	const queryClient = useQueryClient();

	const putLogTimeMutation = useMutation(
		({ id, data, options }) => putLogTimes(id, data, options),
		{
			onError: (error) => {
				console.log(error);
			},
			onSuccess: (res, { id }) => {
				if (res.errors) {
					setState({
						...state,
						errors: formatErrors(res.errors),
					});
				} else {
					queryClient.setQueryData(`/workers/job/${id}`, (oldData) => ({
						...oldData,
						data: res,
					}));

					history.push("/jobs");
				}
			},
		}
	);

	const handleChange = (e) => {
		const { value, name } = e.target;
		setState({
			...state,
			[name]: value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (
			!window.confirm(
				`Do you confirm that the times (start: ${startTime} — end: ${endTime}) are correct? You cannot change the time after you submit.`
			)
		) {
			return;
		}

		putLogTimeMutation.mutate({
			id,
			data: state,
			options: authorizationHeaders,
		});
	};

	const formatErrors = (errors) =>
		errors.reduce((acc, error) => {
			acc[error.param] = error.msg;
			return acc;
		}, {});

	const { startTime, endTime, feedback, errors } = state;

	return (
		<Form className="mb-5" onSubmit={handleSubmit}>
			<FormGroup>
				<Label for="startTime">Time when you started working</Label>
				<Input
					disabled={!!status}
					type="time"
					name="startTime"
					id="startTime"
					value={startTime}
					onChange={handleChange}
					invalid={!!errors.startTime}
					placeholder="HH:MM (24h clock)"
					pattern="^([0-1]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$"
					required
				/>
				{errors.startTime && (
					<FormText color="danger">{errors.startTime}</FormText>
				)}
			</FormGroup>
			<FormGroup>
				<Label for="endTime">Time when you finished working</Label>
				<Input
					disabled={!!status}
					type="time"
					name="endTime"
					id="endTime"
					value={endTime}
					onChange={handleChange}
					invalid={!!errors.endTime}
					placeholder="HH:MM (24h clock)"
					pattern="^([0-1]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$"
					required
				/>
				{errors.endTime && <FormText color="danger">{errors.endTime}</FormText>}
			</FormGroup>
			<FormGroup className="mb-4">
				<Label for="feedback">Details</Label>
				<Input
					disabled={!!status}
					type="textarea"
					name="feedback"
					id="feedback"
					placeholder="Any details about this particular job that Spring Action Cleaning should know."
					value={feedback}
					onChange={handleChange}
					rows={4}
					maxLength={500}
				/>
				<FormText className="text-right">{feedback.length}/500</FormText>
				{errors.feedback && (
					<FormText color="danger">{errors.feedback}</FormText>
				)}
			</FormGroup>
			<Alert color="dark" fade={false}>
				<strong>Important:</strong> When you submit your time using this form,
				this acts as your signature. The time acts as a true record of your
				work.
			</Alert>
			<div className="d-flex justify-content-end">
				<BackButton />
				<Button type="submit" className="ml-4" disabled={!!status}>
					Submit
				</Button>
			</div>
		</Form>
	);
};

WorkerLogTimeForm.propTypes = {
	id: PropTypes.string,
	start_time: PropTypes.string,
	end_time: PropTypes.string,
	worker_feedback: PropTypes.string,
	status: PropTypes.number,
};

export default WorkerLogTimeForm;
