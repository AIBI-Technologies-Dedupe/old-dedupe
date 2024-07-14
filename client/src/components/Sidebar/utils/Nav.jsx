import {
	FaHome,
	FaRegBookmark,
	FaUsersCog,
	FaFileImport,
} from "react-icons/fa";
import { FaMagnifyingGlass, FaWpforms } from "react-icons/fa6";

export const getNavLinks = (userRole) => {
	const navLinks = [
		{
			name: "Home",
			Icon: <FaHome />,
			to: "/",
			subpages: null,
		},
		{
			name: "Users",
			Icon: <FaUsersCog />,
			to: null,
			subpages: [
				{ name: "Add User", to: "/users/add" },
				{ name: "View Users", to: "/users/view" },
			],
		},
		{
			name: "Logs",
			Icon: <FaRegBookmark />,
			to: null,
			subpages: [
				{ name: "Search Audit", to: "/history/search" },
				{ name: "Login Audit", to: "/history/users" },
				{ name: "Upload Audit", to: "/history/upload" },
			],
		},
		{
			name: "Search",
			Icon: <FaMagnifyingGlass />,
			to: "/cases/view",
			subpages: null,
		},
		{
			name: "Import",
			Icon: <FaFileImport />,
			to: "/cases/add",
			subpages: null,
		},
	];

	if (userRole !== "admin") {
		return navLinks.filter(
			(link) =>
				link.name !== "Users" && link.name !== "Logs" && link.name !== "Home"
		);
	}

	return navLinks;
};
