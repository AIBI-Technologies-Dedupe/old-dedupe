import { createBrowserRouter } from "react-router-dom";

import Login from "../pages/login/Login";
import Home from "../pages/home";
import Layout from "./Layout";

import AddUsers from "../pages/users/add";
import ViewUsers from "../pages/users/view";

import AddCases from "../pages/cases/add";
import ViewCases from "../pages/cases/view";

import AuthGuard from "./AuthGuard"; // Import the AuthGuard component
import ViewHistory from "../pages/history";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Layout />,
		children: [
			{ path: "/", element: <AuthGuard element={Home} /> },
			{
				path: "users/view",
				element: <AuthGuard element={ViewUsers} />,
			},
			{
				path: "users/add",
				element: <AuthGuard element={AddUsers} />,
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
				element: <AuthGuard element={ViewHistory} />,
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
