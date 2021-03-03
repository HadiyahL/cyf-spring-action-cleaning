import React from "react";
import PropTypes from "prop-types";
import { FormGroup, Label, Input, FormText } from "reactstrap";

const DetailsInput = ({ state, setState, error, name }) => {
	const handleChange = (e) => {
		setState({
			...state,
			[name]: e.target.value,
		});
	};

	const label =
		name === "comment" ? "Comment (for invoice purposes)" : "Job details";

	return (
		<div className="mb-3 mb-md-4 mb-lg-5">
			<FormGroup>
				<Label for="details" size="lg">
					{label} <span className="text-muted">(optional)</span>
				</Label>
				<Input
					type="textarea"
					name={name}
					id={name}
					value={state[name] || ""}
					onChange={handleChange}
					maxLength={500}
					rows={4}
				/>
				<FormText className="text-right">{state[name].length}/500</FormText>
				{error && <FormText color="danger">{error}</FormText>}
			</FormGroup>
		</div>
	);
};

DetailsInput.propTypes = {
	state: PropTypes.object.isRequired,
	setState: PropTypes.func.isRequired,
	error: PropTypes.string,
	name: PropTypes.string.isRequired,
};

export default DetailsInput;
