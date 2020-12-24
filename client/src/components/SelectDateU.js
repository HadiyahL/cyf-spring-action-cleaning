import React from "react";
import PropTypes from "prop-types";
import { FormGroup, Label, Input, FormText } from "reactstrap";

const SelectDateU = ({ state, setState, error, dateAttribute, attributeTitle }) => {

	const handleChange = (e) => {
		setState({
			...state,
			[dateAttribute]: e.target.value,
		});
	};

	return (
		<div className="mb-3 mb-md-4 mb-lg-5">
			<FormGroup>
				<Label for="date" size="lg">
					{attributeTitle}
				</Label>
				<Input
					invalid={!!error}
					type="date"
					name="date"
					id="date"
					value={state[dateAttribute]}
					onChange={handleChange}
					placeholder="DD-MM-YYYY"
					required
				/>
				{error && <FormText color="danger">{error}</FormText>}
			</FormGroup>
		</div>
	);
};

SelectDateU.propTypes = {
	state: PropTypes.object.isRequired,
	setState: PropTypes.func.isRequired,
	error: PropTypes.string,
};

export default SelectDateU;
