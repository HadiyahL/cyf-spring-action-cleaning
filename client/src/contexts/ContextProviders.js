import React from "react";
import PropTypes from "prop-types";
import { JobsProvider } from "./Jobs";
import { RecurringJobsProvider } from "./RecurringJobs";
import { CustomerReportProvider } from "./CustomerReport";
import { BranchReportProvider } from "./BranchReport";
import { WorkerReportProvider } from "./WorkerReport";
import { GeneralReportProvider } from "./GeneralReport";
import { WorkerJobsProvider } from "./WorkerJobs";
import { InvoiceProvider } from "./Invoice";

const ContextProviders = ({ children }) => {
	return (
		<JobsProvider>
			<RecurringJobsProvider>
				<WorkerReportProvider>
					<BranchReportProvider>
						<GeneralReportProvider>
							<WorkerJobsProvider>
								<InvoiceProvider>
									<CustomerReportProvider>{children}</CustomerReportProvider>
								</InvoiceProvider>
							</WorkerJobsProvider>
						</GeneralReportProvider>
					</BranchReportProvider>
				</WorkerReportProvider>
			</RecurringJobsProvider>
		</JobsProvider>
	);
};

ContextProviders.propTypes = {
	children: PropTypes.node.isRequired,
};

export default ContextProviders;
