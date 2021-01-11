import React from "react";
import { Container, List } from "reactstrap";

const Footer = () => {
	return (
		<footer className="footer mt-auto py-4 bg-light">
			<Container>
				<List
					type="unstyled"
					className="footer-list mb-0 text-muted text-center"
				>
					<li>
						<a
							href="mailto:info@springactioncleaning.co.uk"
							className="text-muted"
						>
							info@springactioncleaning.co.uk
						</a>
					</li>
					<li>07799628095</li>
					<li>Norton House</li>
					<li>Bird Street</li>
					<li>Coventry, CV1 5FX</li>
					<li className="mt-3">
						A Social enterprise founded by Coventry Refugee and Migrant Centre
					</li>
				</List>
			</Container>
		</footer>
	);
};

export default Footer;
