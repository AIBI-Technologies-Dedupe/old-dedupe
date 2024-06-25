import { FaHome, FaRegBookmark, FaUsersCog } from "react-icons/fa";
import { FaMagnifyingGlass, FaWpforms } from "react-icons/fa6";

export const navLinks = [
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
		to: "/",
		subpages: null,
	},
	{
		name: "Search",
		Icon: <FaMagnifyingGlass />,
		to: "/search",
	},
];
