import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
} from "reactstrap";
import { Link } from "react-router-dom";
import { LoginButton, LogoutButton } from "./auth";
import logo from "../assets/logo.png";
import Spinner from "./UI/Spinner";

const Navigation = () => {
	const [isOpen, setIsOpen] = useState(false);
	const { isLoading, isAuthenticated } = useAuth0();
	const toggle = () => setIsOpen(!isOpen);

	if (isLoading) {
		return <Spinner />;
	}

	return (
		<div>
			<Navbar color="light" light expand="md">
				<NavbarBrand href="/">
					<img src={logo} className="navbar_logo" alt="spring-action-logo" />
				</NavbarBrand>
				<NavbarToggler onClick={toggle} />
				<Collapse isOpen={isOpen} navbar>
					<Nav className="ml-auto d-flex justify-content-end navItems" navbar>
						{isAuthenticated ? (
							<>
								<NavItem className="mr-md-5 pb-2 pt-2 pb-md-0 pt-md-0 text-center d-flex align-items-center">
									<Link
										className="text-decoration-none link text-secondary "
										to="/customers"
									>
										Client{" "}
									</Link>
								</NavItem>
								<NavItem className="mr-md-5 pb-2 pt-2 pb-md-0 pt-md-0 text-center d-flex align-items-center">
									<Link
										className="text-decoration-none link text-secondary "
										to="/workers"
									>
										Cleaners{" "}
									</Link>
								</NavItem>
								<NavItem className="mr-md-5 pb-2 pt-2 pb-md-0 pt-md-0 text-center d-flex align-items-center">
									<Link
										className="text-decoration-none link text-secondary "
										to="/jobs"
									>
										Jobs
									</Link>
								</NavItem>
								<LogoutButton />
							</>
						) : (
							<LoginButton />
						)}
					</Nav>
				</Collapse>
			</Navbar>
		</div>
	);
};

export default Navigation;
