import React, { useState } from "react";
import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
} from "reactstrap";
import { Link } from "react-router-dom";
import  logo  from "../assets/logo.png";

const Navigation = () => {
	const [isOpen, setIsOpen] = useState(false);

	const toggle = () => setIsOpen(!isOpen);

	return (
		<div>
			<Navbar color="light" light expand="md">
				<NavbarBrand href="/">
					<img
						src={logo}
						style={{ height: 50, width: 60, marginTop: -7 }}
						alt="spring-action-logo"
					/>
				</NavbarBrand>
				<NavbarToggler onClick={toggle} />
				<Collapse isOpen={isOpen} navbar>
					<Nav className="ml-auto d-flex justify-content-end" navbar>
						<NavItem className="mr-5 pb-2">
							<Link className="text-decoration-none" to="/customers">
								Client{" "}
							</Link>
						</NavItem>
						<NavItem className="mr-5 pb-2">
							<Link className="text-decoration-none" to="/workers">
								Cleaners{" "}
							</Link>
						</NavItem>
						<NavItem className="mr-5 pb-2">
							<Link className="text-decoration-none" to="/jobs">
								Jobs
							</Link>
						</NavItem>
					</Nav>
				</Collapse>
			</Navbar>
		</div>
	);
};

export default Navigation;
