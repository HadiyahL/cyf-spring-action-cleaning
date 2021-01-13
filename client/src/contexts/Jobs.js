import React, { createContext, useState } from "react";
import PropTypes from "prop-types";
import { DateTime } from "luxon";

export const JobsContext = createContext([{}, () => {}]);

export const JobsProvider = ({ children }) => {
	const [state, setState] = useState({
		startDate: DateTime.local().toISODate(),
		endDate: "",
		status: "",
	});

	return (
		<JobsContext.Provider value={[state, setState]}>
			{children}
		</JobsContext.Provider>
	);
};

JobsProvider.propTypes = {
	children: PropTypes.node.isRequired,
};
