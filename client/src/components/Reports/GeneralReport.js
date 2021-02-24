import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Form, Button } from "reactstrap";
import SelectDateU from "./SelectDateU";
import { GeneralReportContext } from "../../contexts/GeneralReport";

const CreateGeneralReport = () => {
	const [state, setState] = useContext(GeneralReportContext);
	const history = useHistory();

	const handleSubmit = (e) => {
		e.preventDefault();
		history.push("/general_results"); // Go to <GeneralReport>
	};

	return (
		<Form onSubmit={handleSubmit}>
			<div className="d-sm-flex justify-content-between">
				<SelectDateU
					state={state}
					setState={setState}
					dateAttribute="start_date"
					attributeTitle="Start date"
				/>
				<SelectDateU
					state={state}
					setState={setState}
					dateAttribute="finish_date"
					attributeTitle="Finish date"
				/>
			</div>
			<div className="d-flex justify-content-end">
				<Button>Run</Button>
			</div>
		</Form>
	);
};

export default CreateGeneralReport;
