import React from "react";
import { useParams } from "react-router-dom";
import { Container, Col, Row } from "reactstrap";
import useFetch from "../hooks/useFetch";
import { Spinner, WorkerLogTimeForm, WorkerJobInfo } from "../components";

const WorkerJobPage = () => {
	const { id } = useParams();
	const { error, isLoading, data } = useFetch(`/workers/job/${id}`);

	if (error) {
		return <div>Oops, something went wrong.</div>;
	}

	if (isLoading) {
		return <Spinner />;
	}

	const {
		address,
		contact_name,
		contact_phone,
		customer,
		details,
		duration,
		visit_time,
		visit_on,
		start_time,
		end_time,
		feedback,
	} = data.jobs[0];

	return (
		<Container>
			<Row className="justify-content-center">
				<Col xs="12" sm="12" md="8" lg="6" xl="6">
					<WorkerJobInfo
						address={address}
						contact_name={contact_name}
						contact_phone={contact_phone}
						customer={customer}
						details={details}
						duration={duration}
						visit_time={visit_time}
						visit_on={visit_on}
					/>
					<WorkerLogTimeForm
						id={id}
						start_time={start_time}
						end_time={end_time}
						worker_feedback={feedback}
					/>
				</Col>
			</Row>
		</Container>
	);
};

export default WorkerJobPage;
