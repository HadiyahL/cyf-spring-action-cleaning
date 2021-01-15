import React from "react";
import { Container, List } from "reactstrap";
import { IconContext } from "react-icons/lib";
import { MdEmail, MdLocationOn, MdPhoneInTalk } from "react-icons/md";
import { BsFillHouseFill } from "react-icons/bs";

const Footer = () => {
	return (
		<footer className="footer mt-auto py-4 bg-light">
			<Container>
				<IconContext.Provider value={{ className: "footer-icons" }}>
					<List
						type="unstyled"
						className="footer-list mb-0 text-muted text-center"
					>
						<li>
							<MdEmail />
							<span className="pl-1">
								<a
									href="mailto:info@springactioncleaning.co.uk"
									className="text-muted"
								>
									info@springactioncleaning.co.uk
								</a>
							</span>
						</li>
						<li>
							<MdPhoneInTalk />
							<span className="pl-1">07799628095</span>
						</li>
						<li>
							<BsFillHouseFill />
							<span className="pl-1">Norton House</span>
						</li>
						<li>
							<MdLocationOn />
							<span className="pl-1">Bird Street, Coventry, CV1 5FX</span>
						</li>
						<li className="mt-3">
							A Social enterprise founded by Coventry Refugee and Migrant Centre
						</li>
					</List>
				</IconContext.Provider>
			</Container>
		</footer>
	);
};

export default Footer;
