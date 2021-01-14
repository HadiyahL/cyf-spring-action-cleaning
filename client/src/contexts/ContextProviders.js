import React from "react";
import PropTypes from "prop-types";
import { JobsProvider } from "./Jobs";
import { RecurringJobsProvider } from "./RecurringJobs";
import { CustomerReportProvider } from "./CustomerReport";
import { WorkerReportProvider } from "./WorkerReport";
import { WorkerJobsProvider } from "./WorkerJobs";

const ContextProviders = ({ children }) => {
	return (
		<JobsProvider>
			<RecurringJobsProvider>
				<WorkerReportProvider>
					<WorkerJobsProvider>
						<CustomerReportProvider>{children}</CustomerReportProvider>
					</WorkerJobsProvider>
				</WorkerReportProvider>
			</RecurringJobsProvider>
		</JobsProvider>
	);
};

ContextProviders.propTypes = {
	children: PropTypes.node.isRequired,
};

export default ContextProviders;
