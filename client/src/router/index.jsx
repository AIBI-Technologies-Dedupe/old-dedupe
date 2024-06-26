import { createBrowserRouter } from "react-router-dom";

import Login from "../pages/login/Login";
import Home from "../pages/home";
import Layout from "./Layout";

import AddUsers from "../pages/users/add";
import ViewUsers from "../pages/users/view";

import AddCases from "../pages/cases/add";
import ViewCases from "../pages/cases/view";

import ViewHistory from "../pages/history";

import AuthGuard from "./AuthGuard"; // Import the AuthGuard component
import AdminGuard from "./AdminGuard";
const router = createBrowserRouter([
	{
		path: "/",
		element: <Layout />,
		children: [
			{ path: "/", element: <AdminGuard element={Home} /> },
			{
				path: "users/view",
				element: <AdminGuard element={ViewUsers} />,
			},
			{
				path: "users/add",
				element: <AdminGuard element={AddUsers} />,
			},
			{
				path: "cases/view",
				element: <AuthGuard element={ViewCases} />,
			},
			{
				path: "cases/add",
				element: <AuthGuard element={AddCases} />,
			},
			{
				path: "history/view",
				element: <AdminGuard element={ViewHistory} />,
			},
		],
	},
	{
		path: "/login",
		element: <Login />,
	},
	{
		path: "*",
		element: <Login />, // This will redirect to login for any unmatched routes
	},
]);

export default router;
