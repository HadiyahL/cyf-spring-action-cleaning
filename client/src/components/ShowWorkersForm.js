import React, { useState ,useEffect } from "react";
import {
	Table,
} from "reactstrap";
import { getWorkers } from "../service";
const ShowWorkersForm = ({kick}) => {
	const [list, setList] = useState([]);
	useEffect(() => getWorkers()
		.then((data) => setList(data))
		.catch((err) => console.error(err)),[kick]);

console.log(list);
console.log(kick);

	return (
		<div>

		</div>
	);
};

export default ShowWorkersForm;