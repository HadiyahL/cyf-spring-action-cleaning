import React from "react";
import { GiVacuumCleaner } from "react-icons/gi";
import { IconContext } from "react-icons/lib";

const HomepageText = () => {
	return (
		<IconContext.Provider value={{ className: "homepage-icons" }}>
			<div className="homepage-text">
				<h2 className="mb-5 mb-md-5 mt-4">
					Spring Action Cleaning Application
				</h2>
				<ul className="mb-md-5 px-2">
					<li className="mb-4 mb-md-3">
						<GiVacuumCleaner />
						<p>Add and edit Customers, Cleaners & Jobs</p>
					</li>
					<li className="mb-4 mb-md-3">
						<GiVacuumCleaner />
						<p>Cleaners log and submit time</p>
					</li>
					<li className="mb-4 mb-md-3">
						<GiVacuumCleaner />
						<p>
							Generate reports to calculate total time of services provided for
							a given period
						</p>
					</li>
				</ul>
			</div>
		</IconContext.Provider>
	);
};

export default HomepageText;
