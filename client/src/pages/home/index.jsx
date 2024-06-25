import React from "react";
import { days } from "../../utils/days";
import InfoCard from "../../components/Info";
import { FaBriefcase, FaUserCog } from "react-icons/fa";
import { useGetUsersQuery } from "../../api/users"; // Adjust the path as needed
import { useGetCountQuery } from "../../api/data";

const Home = () => {
	const date = new Date();
	const offset =
		date.getTimezoneOffset() === 0 ? 0 : -1 * date.getTimezoneOffset();
	let normalized = new Date(date.getTime() + offset * 60000);
	let indiaTime = new Date(
		normalized.toLocaleString("en-US", { timeZone: "Asia/Calcutta" })
	);

	const {
		data: userData,
		error: userError,
		isLoading: userLoading,
	} = useGetUsersQuery();
	const {
		data: countData,
		error: countError,
		isLoading: countLoading,
	} = useGetCountQuery();

	if (userLoading || countLoading) return <div>Loading...</div>;
	if (userError) return <div>Error loading users.</div>;
	if (countError) return <div>Error loading counts.</div>;

	const users = userData?.users ? [...userData.users] : [];

	const casesCount = countData?.count || 0;

	// Sort users by creation date and get the 5 most recent ones
	let recentUsers = [];
	if (users.length) {
		recentUsers = users
			.slice()
			.sort((a, b) => new Date(b.createdat) - new Date(a.createdat))
			.slice(0, 5);
	}

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
			<div className="flex flex-col gap-2 md:flex-row">
				<InfoCard
					color="blue"
					count={casesCount}
					title="Cases"
					icon={<FaBriefcase />}
				/>
				<InfoCard
					color="green"
					count={users.length}
					title="Users"
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
									Email
								</th>
								<th scope="col" className="px-6 py-3">
									Phone Number
								</th>
								<th scope="col" className="px-6 py-3">
									Role
								</th>
								<th scope="col" className="px-6 py-3">
									Created On
								</th>
							</tr>
						</thead>
						<tbody>
							{recentUsers.map((user) => (
								<tr key={user.id} className="bg-white">
									<th
										scope="row"
										className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
										{user.name}
									</th>
									<td className="px-6 py-4">{user.email}</td>
									<td className="px-6 py-4">{user.phoneNo}</td>
									<td className="px-6 py-4">{user.role.toUpperCase()}</td>
									<td className="px-6 py-4">
										{new Date(user.createdat).toLocaleDateString()}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default Home;
