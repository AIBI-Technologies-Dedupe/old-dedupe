import React from "react";
import { days } from "../../utils/days";
import InfoCard from "../../components/Info";
import { FaBriefcase, FaUserCog } from "react-icons/fa";

import { Link } from "react-router-dom";
const Home = () => {
	const date = new Date();
	const offset =
		date.getTimezoneOffset() === 0 ? 0 : -1 * date.getTimezoneOffset();
	let normalized = new Date(date.getTime() + offset * 60000);
	let indiaTime = new Date(
		normalized.toLocaleString("en-US", { timeZone: "Asia/Calcutta" })
	);

	return (
		<div className="flex flex-col gap-6">
			<div className="flex flex-col gap-2">
				<h3 className="text-xl font-bold text-gray-800">Dashboard</h3>
				<div className="flex gap-1 text-gray-500">
					<p>Today:</p>
					<p> {days[indiaTime.getDay()]},</p>
					<p>{indiaTime.getDate()}</p>
					<p> {indiaTime.getFullYear()}</p>
				</div>
			</div>
			<div className="grid grid-cols-3 gap-4">
				<Link to="/">
					<InfoCard color="" title="Search Audit" icon={<FaBriefcase />} />
				</Link>
				<Link to="/cases/add">
					<InfoCard color="blue" title="User Audit" icon={<FaBriefcase />} />
				</Link>
				<Link to="/cases/add">
					<InfoCard color="orange" title="Import" icon={<FaBriefcase />} />
				</Link>

				<Link to="/users/add">
					<InfoCard color="green" title="Add Users" icon={<FaUserCog />} />
				</Link>
			</div>
		</div>
	);
};

export default Home;
