import { FaHome, FaRegBookmark, FaUsersCog } from "react-icons/fa";
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
			to: "/history/view",
			subpages: null,
		},
		{
			name: "Cases",
			Icon: <FaMagnifyingGlass />,
			to: null,
			subpages: [
				{ name: "Import", to: "/cases/add" },
				{ name: "Search", to: "/cases/view" },
			],
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
