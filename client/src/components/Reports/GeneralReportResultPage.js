import React, { useState } from "react";
import { Container, Table, Button } from "reactstrap";
import { Spinner, Title, BackButton } from "../index";
import PropTypes from "prop-types";
import useFetch from "../../hooks/useFetch";
import ResultTableHead from "./ResultTableHead";
import GeneralTable from "./GeneralTable";

const GeneralReportResultPage = ({ state, setState }) => {
	const { start_date, finish_date } = state;
	const [showFeedback, setShowFeedback] = useState(false);
	const { data, error, isLoading } = useFetch(
		`/general_reports/general/${start_date}/${finish_date}`
	);

	const hideFeedbackHandle = () => {
		setShowFeedback(!showFeedback);
	};

	if (error) {
		return <div>Error</div>;
	} else if (isLoading) {
		return <Spinner />;
	} else {
		return (
			<Container>
				<Title text="General report" />
				<h3 className="text-center mt-4 mt-md-5 mb-5 mb-md-5">
					Work duration from {start_date} to {finish_date}
				</h3>
				{data.generalData.length === 0 ? (
					<p>No data for this period.</p>
				) : (
					<>
						<div className="d-flex justify-content-end d-print-none">
							{" "}
							<Button color="link" size="sm" onClick={hideFeedbackHandle}>
								{showFeedback ? "Hide feedback" : "Show feedback"}
							</Button>
						</div>
						<Table striped hover responsive>
							<ResultTableHead
								labels={
									showFeedback
										? [
												"Customer",
												"Address",
												"Date",
												"Cleaner",
												"Contracted Hours",
												"Actual Hours",
												"Difference In Hours",
												"Cleaner's comment",
										  ]
										: [
												"Customer",
												"Address",
												"Date",
												"Cleaner",
												"Contracted Hours",
												"Actual Hours",
												"Difference In Hours",
										  ]
								}
								detailed={false}
							/>
							<GeneralTable
								data={data.generalData}
								state={state}
								setState={setState}
								showFeedback={showFeedback}
							/>
							<GeneralTable
								data={data.generalTotals}
								tableFooter={true}
								showFeedback={showFeedback}
							/>
						</Table>
					</>
				)}
				<div className="d-flex justify-content-end mt-5">
					<BackButton state={state} setState={setState} />
				</div>
			</Container>
		);
	}
};

GeneralReportResultPage.propTypes = {
	state: PropTypes.object,
	setState: PropTypes.func,
};

export default GeneralReportResultPage;
