import {
	FaHome,
	FaUsers,
	FaUsersCog,
	FaProductHunt,
	FaBriefcase,
	FaWalking,
} from "react-icons/fa";
import { RiInputField, RiMoneyRupeeCircleFill } from "react-icons/ri";
import { FaMagnifyingGlass, FaWpforms } from "react-icons/fa6";
import { MdOutlineSettings } from "react-icons/md";

export const navLinks = [
	{
		name: "Home",
		Icon: <FaHome />,
		to: "/",
		subpages: null,
	},
	{
		name: "Clients",
		Icon: <FaUsers />,
		to: null,
		subpages: [
			{ name: "Add Client", to: "/clients/add" },
			{ name: "View Clients", to: "/clients/view" },
			{ name: "Bulk Import", to: "/clients/bulk-import" },
		],
	},
	{
		name: "Employees",
		Icon: <FaUsersCog />,
		to: null,
		subpages: [
			{ name: "Add Employee", to: "/employees/add" },
			{ name: "View Employees", to: "/employees/view" },
			{ name: "Bulk Import", to: "/employees/bulk-import" },
		],
	},
	{
		name: "Cases",
		Icon: <FaBriefcase />,
		to: null,
		subpages: [
			{ name: "Add Case", to: "/cases/add" },
			{ name: "View Cases", to: "/cases/view" },
			{ name: "Bulk Import", to: "/cases/bulk-import" },
		],
	},
	{
		name: "Fields",
		Icon: <RiInputField />,
		to: null,
		subpages: [
			{ name: "Add Field", to: "/fields/add" },
			{ name: "View Fields", to: "/fields/view" },
			{ name: "Bulk Import", to: "/fields/bulk-import" },
		],
	},
	{
		name: "Forms",
		Icon: <FaWpforms />,
		to: null,
		subpages: [
			{ name: "Add Form", to: "/forms/add" },
			{ name: "View Forms", to: "/forms/view" },
			{ name: "Bulk Import", to: "/forms/bulk-import" },
		],
	},
	{
		name: "Products",
		Icon: <FaProductHunt />,
		to: null,
		subpages: [
			{ name: "Add Product", to: "/products/add" },
			{ name: "View Products", to: "/products/view" },
			{ name: "Bulk Import", to: "/products/bulk-import" },
		],
	},
	{
		name: "Verifications",
		Icon: <FaMagnifyingGlass />,
		to: null,
		subpages: [
			{ name: "Add Verification", to: "/verifications/add" },
			{ name: "View Verifications", to: "/verifications/view" },
			{ name: "Bulk Import", to: "/verifications/bulk-import" },
		],
	},
	{
		name: "Activities",
		Icon: <FaWalking />,
		to: null,
		subpages: [
			{ name: "Add Activities", to: "/activities/add" },
			{ name: "View Activities", to: "/activities/view" },
			{ name: "Bulk Import", to: "/activities/bulk-import" },
		],
	},
	{
		name: "Accounting",
		Icon: <RiMoneyRupeeCircleFill />,
		to: null,
		subpages: [
			{ name: "Incoming", to: "/accounting/incoming" },
			{ name: "Outgoing", to: "/accounting/outgoing" },
			{ name: "Invoices", to: "/accounting/invoices" },
		],
	},
	{
		name: "Change Password",
		Icon: <MdOutlineSettings />,
		to: "/password",
		subpages: null,
	},
];
