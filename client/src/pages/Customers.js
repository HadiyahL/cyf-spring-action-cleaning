import React from "react";
import { Container } from "reactstrap";
import { ShowCustomers } from "../components";

const Customers = () => {
  return (
    <Container>
      <h2 className="text-center mt-4 mt-md-5 mb-5 mb-md-5">
        Clients
      </h2>
      <ShowCustomers />
    </Container>
  );
};

export default Customers;
