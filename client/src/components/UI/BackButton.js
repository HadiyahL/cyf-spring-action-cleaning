import React from "react";
import { Button } from "reactstrap";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";

const BackButton = ({ state, setState, type = "" }) => {
	const history = useHistory();

	const handleBack = () => {
		if (state) {
			if (state.branch) {
				if (type) {
					setState({
						...state,
						customer_id: "",
						customer: "All customers",
						branch_id: "",
						branch: "All addresses",
					});
				} else {
					setState({ ...state, branch_id: "", branch: "All addresses" });
				}
			} else if (state.worker) {
				setState({ ...state, worker_id: "", worker: "All cleaners" });
			} else {
				setState({ ...state, customer_id: "", customer: "All customers" });
			}
		}
		history.goBack();
	};

	return (
		<Button color="primary" onClick={handleBack} className="d-print-none">
			Back
		</Button>
	);
};

BackButton.propTypes = {
	state: PropTypes.object,
	setState: PropTypes.func,
	type: PropTypes.string,
};

export default BackButton;
