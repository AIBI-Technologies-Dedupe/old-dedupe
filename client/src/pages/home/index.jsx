import React from "react";
import { days } from "../../utils/days";
import InfoCard from "../../components/Info";
import { FaBriefcase, FaUserCog, FaUsers } from "react-icons/fa";
const Home = () => {
	const date = new Date();
	const offset =
		date.getTimezoneOffset() == 0 ? 0 : -1 * date.getTimezoneOffset();
	let normalized = new Date(date.getTime() + offset * 60000);
	let indiaTime = new Date(
		normalized.toLocaleString("en-US", { timeZone: "Asia/Calcutta" })
	);

	console.log;
	return (
		<div className="flex flex-col gap-6">
			<div className="flex flex-col gap-2">
				<h3 className="text-xl font-bold text-gray-800">Dashboard</h3>
				<div className="flex gap-1 text-gray-500 ">
					<p>Today:</p>
					<p> {days[indiaTime.getDay()]},</p>
					<p>{indiaTime.getDate()}</p>
					<p> {indiaTime.getFullYear()}</p>
				</div>
			</div>
			<div className="flex flex-col gap-2 md:flex-row">
				<InfoCard
					color="blue"
					count={12}
					title="Cases"
					icon={<FaBriefcase />}
				/>
				<InfoCard color="red" count={12} title="Clients" icon={<FaUsers />} />
				<InfoCard
					color="green"
					count={12}
					title="Employees"
					icon={<FaUserCog />}
				/>
			</div>
			<div className="flex flex-col gap-6 md:flex-row">
				<div className="flex flex-col flex-1 gap-4">
					<h3 className="px-6 font-bold text-gray-700">
						Recently Added Employees
					</h3>

					<table className="w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400">
						<thead className="text-xs text-gray-700 uppercase border-b border-gray-500 bg-gray-50">
							<tr>
								<th scope="col" className="px-6 py-3">
									Name
								</th>
								<th scope="col" className="px-6 py-3">
									Created On
								</th>
							</tr>
						</thead>
						<tbody>
							<tr className="bg-white">
								<th
									scope="row"
									className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
									Kunal Sharma
								</th>
								<td className="px-6 py-4">12/12/2002</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default Home;
