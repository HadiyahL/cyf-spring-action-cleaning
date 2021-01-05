import React from "react";
import PropTypes from "prop-types";
import { FormGroup, Input } from "reactstrap";

const FilterInput = ({ setData, filterBy }) => {
	const handleChange = (e) => {
		const { value } = e.target;
		setData((state) => ({
			...state,
			data: state.originalData.filter((item) =>
				item[filterBy].toLowerCase().includes(value.toLowerCase())
			),
		}));
	};

	return (
		<FormGroup>
			<Input
				placeholder="Filter..."
				name="filterInput"
				onChange={handleChange}
			/>
		</FormGroup>
	);
};

FilterInput.propTypes = {
	setData: PropTypes.func,
	filterBy: PropTypes.string,
};

export default FilterInput;
