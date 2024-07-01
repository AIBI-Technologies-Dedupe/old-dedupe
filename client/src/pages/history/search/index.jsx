import React, { useEffect } from "react";
import { useLazyGetSearchHistoryQuery } from "../../../api/history";
const Index = () => {
	const [triggerGetSearchHistory, { data, error, isLoading }] =
		useLazyGetSearchHistoryQuery();

	useEffect(() => {
		triggerGetSearchHistory();
	}, [triggerGetSearchHistory]);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	let users = [];
	if (data) {
		users = data.data;
	}
	console.log(users);

	return (
		<div>
			<h3 className="text-xl font-bold text-gray-800">Search Audit</h3>
			<table className="w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400">
				<thead className="text-xs text-gray-700 uppercase border-b border-gray-500 bg-gray-50">
					<tr>
						<th scope="col" className="px-6 py-3">
							Name
						</th>
						<th scope="col" className="px-6 py-3">
							Search Count
						</th>
						<th scope="col" className="px-6 py-3">
							Search Date
						</th>
					</tr>
				</thead>
				<tbody>
					{users.map((user, idx) => {
						return (
							<tr key={idx} className="bg-white">
								<td className="px-6 py-4">{user.name}</td>
								<td className="px-6 py-4">{user.searchCount}</td>
								<td className="px-6 py-4">{user.searchDate}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};

export default Index;
