import React, { createContext, useState } from "react";
import PropTypes from "prop-types";
import { DateTime } from "luxon";

export const WorkerJobsContext = createContext([{}, () => {}]);

export const WorkerJobsProvider = ({ children }) => {
	const [state, setState] = useState({
		startDate: DateTime.local().toISODate(),
		endDate: DateTime.local().plus({ months: 1 }).toISODate(),
	});

	return (
		<WorkerJobsContext.Provider value={[state, setState]}>
			{children}
		</WorkerJobsContext.Provider>
	);
};

WorkerJobsProvider.propTypes = {
	children: PropTypes.node.isRequired,
};
