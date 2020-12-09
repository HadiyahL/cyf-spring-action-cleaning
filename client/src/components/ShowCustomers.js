// import { json } from "express";
import React, { useState } from "react";
import { Table } from "reactstrap";
import {getCustomers } from "../service";

const ShowCustomers = () => {
    const [list, setList] = useState([]);
    getCustomers()
    .then((data)=> setList(data))
    .catch((err) => console.log(err))

    console.log(list);
  return (
    <Table striped>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Email</th>
          <th>Phone Number</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">1</th>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <th scope="row">2</th>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        <tr>
          <th scope="row">3</th>
          <td>Larry</td>
          <td>the Bird</td>
          <td>@twitter</td>
        </tr>
      </tbody>
    </Table>
  );
};

export default ShowCustomers;
