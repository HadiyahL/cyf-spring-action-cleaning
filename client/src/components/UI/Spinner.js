import React from "react";
import { Spinner } from "reactstrap";

const Loader = () => {
	return (
		<div className="text-center">
			<Spinner color="primary" />
		</div>
	);
};

export default Loader;
