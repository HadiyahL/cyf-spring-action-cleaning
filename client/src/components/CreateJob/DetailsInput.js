import React from "react";
import PropTypes from "prop-types";
import { FormGroup, Label, Input, FormText } from "reactstrap";

const DetailsInput = ({ state, setState, error }) => {
	const handleChange = (e) => {
		setState({
			...state,
			details: e.target.value,
		});
	};

	return (
		<div className="mb-3 mb-md-4 mb-lg-5">
			<FormGroup>
				<Label for="details" size="lg">
					Details <span className="text-muted">(optional)</span>
				</Label>
				<Input
					type="textarea"
					name="details"
					id="details"
					value={state.details || ""}
					onChange={handleChange}
					maxLength={500}
					rows={4}
				/>
				<FormText className="text-right">{state.details.length}/500</FormText>
				{error && <FormText color="danger">{error}</FormText>}
			</FormGroup>
		</div>
	);
};

DetailsInput.propTypes = {
	state: PropTypes.object.isRequired,
	setState: PropTypes.func.isRequired,
	error: PropTypes.string,
};

export default DetailsInput;
