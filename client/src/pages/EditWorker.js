import React from "react";
import { Container } from "reactstrap";
import { useParams } from "react-router-dom";
import CreateWorkerForm from "../components/CreateWorkerForm";
import Spinner from "../components/UI/Spinner";
import useFetch from "../hooks/useFetch";

const EditWorker = () => {
	const { id } = useParams();
	const { data, isLoading, error } = useFetch(`/workers/${id}`);
	if (error) {
		return <div>Oops, something went wrong.</div>;
	} else if (isLoading) {
		return <Spinner />;
	} else {
		const {
			name,
			email,
			address,
			phone_number,
			whatsapp,
			permanent_contract,
			id,
		} = data.workers[0];

		return (
			<Container>
				<h2 className="text-center mt-4 mt-md-5 mb-5 mb-md-5">Edit cleaner</h2>
				<CreateWorkerForm
					name={name}
					email={email}
					address={address}
					phone={phone_number}
					whatsapp={whatsapp}
					contract={permanent_contract}
					worker_id={id}
				/>
			</Container>
		);
	}
};

export default EditWorker;
