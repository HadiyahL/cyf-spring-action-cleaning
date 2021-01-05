import React from "react";
import PropTypes from "prop-types";
import { FormGroup, Label, Input } from "reactstrap";

const DetailsInput = ({ state, setState }) => {
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
					rows={4}
				/>
			</FormGroup>
		</div>
	);
};

DetailsInput.propTypes = {
	state: PropTypes.object.isRequired,
	setState: PropTypes.func.isRequired,
};

export default DetailsInput;
