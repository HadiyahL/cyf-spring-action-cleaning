import React from "react";
import { GiVacuumCleaner } from "react-icons/gi";
import { IconContext } from "react-icons/lib";

const HomepageText = () => {
	return (
		<>
			<IconContext.Provider value={{ className: "homepage-icons" }}>
				<div className="homepage_text">
					<h2>Spring Action Cleaning Application</h2>
					<ul>
						<li>
							<GiVacuumCleaner />
							<p>Add and edit Clients, Cleaners & Jobs</p>
						</li>
						<li>
							<GiVacuumCleaner />
							<p>Cleaners log and submit time</p>
						</li>
						<li>
							<GiVacuumCleaner />
							<p>
								Generate reports to calculate total time of services provided
								for a given period
							</p>
						</li>
					</ul>
				</div>
			</IconContext.Provider>
		</>
	);
};

export default HomepageText;
