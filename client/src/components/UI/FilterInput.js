import React, { useEffect, useRef } from "react";
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
			<SearchText handleChange={handleChange} />
		</FormGroup>
	);
};

const SearchText = ({ handleChange }) => {
	const searchInput = useRef(null);
	useEffect(() => {
		searchInput.current.focus();
	}, []);

	return (
		<Input
			placeholder="Filter..."
			innerRef={searchInput}
			name="searchInput"
			onChange={handleChange}
		/>
	);
};

FilterInput.propTypes = {
	setData: PropTypes.func,
	filterBy: PropTypes.string,
};

SearchText.propTypes = {
	handleChange: PropTypes.func,
};

export default FilterInput;
