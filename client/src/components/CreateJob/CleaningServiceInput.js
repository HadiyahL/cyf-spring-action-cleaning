import React from "react";
import PropTypes from "prop-types";
import { FormGroup, Label, Input, FormText } from "reactstrap";

const CleaningServiceInput = ({ state, setState, error }) => {
	const handleChange = (e) => {
		setState({
			...state,
			cleaning_service: e.target.value,
		});
	};

	return (
		<div className="mb-3 mb-md-4 mb-lg-5">
			<FormGroup>
				<Label for="cleaning_service" size="lg">
					Cleaning service <span className="text-muted">(optional)</span>
				</Label>
				<Input
					name="cleaning_service"
					id="cleaning_service"
					placeholder="One-off, regular, ..."
					value={state.cleaning_service || ""}
					onChange={handleChange}
					maxLength={50}
				/>
				<FormText className="text-right">
					{state.cleaning_service.length}/50
				</FormText>
				{error && <FormText color="danger">{error}</FormText>}
			</FormGroup>
		</div>
	);
};

CleaningServiceInput.propTypes = {
	state: PropTypes.object.isRequired,
	setState: PropTypes.func.isRequired,
	error: PropTypes.string,
};

export default CleaningServiceInput;
