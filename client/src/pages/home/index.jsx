import React from "react";
import { days } from "../../utils/days";
import InfoCard from "../../components/Info";
import { FaBriefcase, FaUserCog } from "react-icons/fa";
import { useExportUsersToExcelMutation } from "../../api/users";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
	const date = new Date();
	const offset =
		date.getTimezoneOffset() === 0 ? 0 : -1 * date.getTimezoneOffset();
	let normalized = new Date(date.getTime() + offset * 60000);
	let indiaTime = new Date(
		normalized.toLocaleString("en-US", { timeZone: "Asia/Calcutta" })
	);

	const [exportUsersToExcel, { isLoading }] = useExportUsersToExcelMutation();

	const handleExport = async () => {
		try {
			const response = await exportUsersToExcel().unwrap();
			const url = window.URL.createObjectURL(new Blob([response]));
			const link = document.createElement("a");
			link.href = url;
			link.setAttribute("download", "users.xlsx");
			document.body.appendChild(link);
			link.click();
			link.remove();
			toast.success("Export successful!");
		} catch (error) {
			console.error("Failed to export users to Excel:", error);
			toast.error("Failed to export.");
		}
	};

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
			<div>
				<button
					onClick={handleExport}
					disabled={isLoading}
					className="font-bold underline hover:text-blue-500">
					{isLoading ? "Exporting..." : "Export Users to Excel"}
				</button>
			</div>
		</div>
	);
};

export default Home;
