import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	UncontrolledDropdown,
	DropdownMenu,
	DropdownItem,
	DropdownToggle,
	List,
} from "reactstrap";
import { Link } from "react-router-dom";
import { LoginButton, LogoutButton } from "./auth";
import logo from "../assets/logo.png";
import Spinner from "./UI/Spinner";

const Navigation = () => {
	const [isOpen, setIsOpen] = useState(false);
	const { isLoading, isAuthenticated } = useAuth0();
	const history = useHistory();

	const toggle = () => setIsOpen(!isOpen);

	const handleLogoClick = () => {
		history.push("/");
	};

	if (isLoading) {
		return <Spinner />;
	}

	return (
		<div>
			<Navbar color="light" light expand="md" className="navbar">
				<NavbarBrand onClick={handleLogoClick}>
					<img src={logo} className="navbar_logo" alt="spring-action-logo" />
				</NavbarBrand>
				<NavbarToggler onClick={toggle} />
				<Collapse isOpen={isOpen} navbar>
					<Nav className="ml-auto d-flex justify-content-end navItems" navbar>
						{isAuthenticated ? (
							<>
								<NavItem className="mr-md-5 pb-2 pt-2 pb-md-0 pt-md-0 text-center d-md-flex align-items-center">
									<Link
										className="text-decoration-none link text-secondary"
										to="/customers"
									>
										Client{" "}
									</Link>
								</NavItem>
								<NavItem className="mr-md-5 pb-2 pt-2 pb-md-0 pt-md-0 text-center d-md-flex align-items-center">
									<Link
										className="text-decoration-none link text-secondary"
										to="/workers"
									>
										Cleaners{" "}
									</Link>
								</NavItem>
								<NavItem className="mr-md-5 pb-2 pt-2 pb-md-0 pt-md-0 text-center d-md-flex align-items-center">
									<Link
										className="text-decoration-none link text-secondary"
										to="/jobs"
									>
										Jobs
									</Link>
								</NavItem>
								<NavItem className="mr-md-5 pb-2 pt-2 pb-md-0 pt-md-0 text-center d-md-flex align-items-center">
									<List>
										<UncontrolledDropdown
											nav
											inNavbar
											className="text-decoration-none link text-secondary"
										>
											<DropdownToggle nav caret className="p-0">
												Reports
											</DropdownToggle>
											<DropdownMenu right>
												<Link to="/workers_report">
													<DropdownItem className="text-decoration-none link text-secondary text-center text-md-left">
														Cleaners
													</DropdownItem>
												</Link>
												<Link to="/customers_report">
													<DropdownItem className="text-decoration-none link text-secondary text-center text-md-left">
														Clients
													</DropdownItem>
												</Link>
											</DropdownMenu>
										</UncontrolledDropdown>
									</List>
								</NavItem>
								<NavItem className="mr-md-5 pb-2 pt-2 pb-md-0 pt-md-0 text-center d-md-flex align-items-center">
									<LogoutButton />
								</NavItem>
							</>
						) : (
							<NavItem className="mr-md-5 pb-2 pt-2 pb-md-0 pt-md-0 text-center d-md-flex align-items-center">
								<LoginButton />
							</NavItem>
						)}
					</Nav>
				</Collapse>
			</Navbar>
		</div>
	);
};

export default Navigation;
