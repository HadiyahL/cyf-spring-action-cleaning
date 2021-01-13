import React, { createContext, useState } from "react";
import PropTypes from "prop-types";
import { getWeekFromDate } from "../util/helpers";

export const RecurringJobsContext = createContext([{}, () => {}]);

export const RecurringJobsProvider = ({ children }) => {
	const [date, setDate] = useState({
		startDate: getWeekFromDate().start,
		endDate: getWeekFromDate().end,
	});

	return (
		<RecurringJobsContext.Provider value={[date, setDate]}>
			{children}
		</RecurringJobsContext.Provider>
	);
};

RecurringJobsProvider.propTypes = {
	children: PropTypes.node.isRequired,
};
