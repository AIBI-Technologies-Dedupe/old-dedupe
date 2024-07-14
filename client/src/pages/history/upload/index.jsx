import React, { useEffect } from "react";
import { useLazyGetUploadHistoryQuery } from "../../../api/history";
const Index = () => {
	const [triggerGetUploadHistory, { data, error, isLoading }] =
		useLazyGetUploadHistoryQuery();

	useEffect(() => {
		triggerGetUploadHistory();
	}, [triggerGetUploadHistory]);

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
							Upload Count
						</th>
						<th scope="col" className="px-6 py-3">
							Upload Date
						</th>
					</tr>
				</thead>
				<tbody>
					{users.map((user, idx) => {
						return (
							<tr key={idx} className="bg-white">
								<td className="px-6 py-4">{user.email}</td>
								<td className="px-6 py-4">{user.successfulUploadCount}</td>
								<td className="px-6 py-4">{user.uploadDate}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};

export default Index;
