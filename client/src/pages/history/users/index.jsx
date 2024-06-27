import React, { useEffect } from "react";
import { useLazyGetUserHistoryQuery } from "../../../api/history";
const Index = () => {
	const [triggerGetUserHistory, { data, error, isLoading }] =
		useLazyGetUserHistoryQuery();

	useEffect(() => {
		triggerGetUserHistory();
	}, [triggerGetUserHistory]);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error loading users data.</div>;
	}
	let users = [];
	if (data) {
		users = data.data;
	}

	return (
		<div>
			<h3 className="text-xl font-bold text-gray-800">Login Audit</h3>
			<table className="w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400">
				<thead className="text-xs text-gray-700 uppercase border-b border-gray-500 bg-gray-50">
					<tr>
						<th scope="col" className="px-6 py-3">
							Email
						</th>
						<th scope="col" className="px-6 py-3">
							Login Count
						</th>
						<th scope="col" className="px-6 py-3">
							Role
						</th>
						<th scope="col" className="px-6 py-3">
							Login Date
						</th>
					</tr>
				</thead>
				<tbody>
					{users.map((user, idx) => {
						return (
							<tr key={idx} className="bg-white">
								<td className="px-6 py-4">{user.email}</td>
								<td className="px-6 py-4">{user.loginCount}</td>
								<td className="px-6 py-4">{user.role.toUpperCase()}</td>
								<td className="px-6 py-4">
									{new Date(user.loginDate).toLocaleDateString()}
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};

export default Index;
