import React, { useState } from "react";
import PropTypes from "prop-types";
import { useQueryClient } from "react-query";
import { Button, FormGroup, Label, FormText } from "reactstrap";
import { getBranches, getBranch } from "../../service";
import Modal from "./Modal";
import useAuthorizationHeaders from "../../hooks/useAuthorizationHeaders";

const SelectBranch = ({ state, setState, error, forReport = false }) => {
	const [modal, setModal] = useState(false);
	const [data, setData] = useState(null);
	const authorizationHeaders = useAuthorizationHeaders();
	const queryClient = useQueryClient();
	const toggle = () => setModal(!modal);

	const fetchBranches = () => {
		queryClient
			.fetchQuery("getBranches", () =>
				getBranches(state.customer_id, authorizationHeaders)
			)
			.then((res) => {
				setData({
					name: "address",
					data: res.rows,
					originalData: res.rows,
					fetchFunction: fetchBranch,
				});
			})
			.catch((e) => console.log(e));
	};

	const fetchBranch = (id) => {
		queryClient
			.fetchQuery("getBranch", () => getBranch(id, authorizationHeaders))
			.then((res) => {
				const data = res.rows[0];
				setState({
					...state,
					branch: data.address,
					branch_id: id,
					worker: data.worker_name ?? null,
					worker_id: data.worker_id ?? null,
					visit_time: data.visit_time ?? null,
					duration: data.duration,
					details: data.branch_details,
				});
			})
			.catch((e) => console.log(e));
	};

	const handleSelectBranches = () => {
		toggle();
		fetchBranches();
	};

	const clearId = () => {
		setState({
			...state,
			branch: "All addresses",
			branch_id: "",
		});
	};

	return (
		<div className="mb-3 mb-md-4 mb-lg-5">
			<FormGroup>
				<div className="d-flex justify-content-between">
					<Label for="branch" size="lg">
						Address
					</Label>
					{forReport && state.branch_id && (
						<Button color="link" size="sm" onClick={clearId}>
							Reset
						</Button>
					)}
				</div>
				<Button
					disabled={!state.customer}
					outline
					color="primary"
					block
					onClick={handleSelectBranches}
					size="lg"
				>
					{state.branch || "Select address"}
				</Button>
				{error && <FormText color="danger">{error}</FormText>}
			</FormGroup>
			<Modal
				isOpen={modal}
				toggle={toggle}
				data={data}
				setData={setData}
				filterBy="address"
			/>
		</div>
	);
};

SelectBranch.propTypes = {
	state: PropTypes.object.isRequired,
	setState: PropTypes.func.isRequired,
	error: PropTypes.string,
	forReport: PropTypes.bool,
};

export default SelectBranch;
