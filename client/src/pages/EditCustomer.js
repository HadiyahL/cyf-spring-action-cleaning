import React from "react";
import { useParams } from "react-router-dom";
import CreateCustomer from "./CreateCustomer";
import Spinner from "../components/UI/Spinner";
import useFetch from "../hooks/useFetch";

const EditCustomer = () => {
	const { id } = useParams();
	const { data, isLoading, error } = useFetch(`/customers/${id}`);

	if (error) {
		return <div>Oops, something went wrong.</div>;
	} else if (isLoading) {
		return <Spinner />;
	} else {
		const { email, id, main_branch_id, name, phone_number } = data.rows[0];
		return (
			<div>
				<CreateCustomer
					email={email}
					id={id}
					main_branch_id={main_branch_id}
					customer_name={name}
					phone_number={phone_number}
				/>
			</div>
		);
	}
};

export default EditCustomer;
