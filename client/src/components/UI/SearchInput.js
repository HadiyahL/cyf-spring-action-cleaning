import React from "react";
import PropTypes from "prop-types";
import { FormGroup, Input } from "reactstrap";

const SearchInput = ({ setFilterInput }) => {
	const handleChange = (e) => {
		const { value } = e.target;
		setFilterInput(value.toLowerCase());
	};

	return (
		<FormGroup>
			<Input
				placeholder="Filter..."
				name="searchInput"
				onChange={handleChange}
			/>
		</FormGroup>
	);
};

SearchInput.propTypes = {
	setFilterInput: PropTypes.func.isRequired,
};

export default SearchInput;
