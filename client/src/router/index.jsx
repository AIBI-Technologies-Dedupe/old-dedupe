import { createBrowserRouter } from "react-router-dom";

import Login from "../pages/login/Login";
import Home from "../pages/home";
import Layout from "./Layout";

import AuthGuard from "./AuthGuard"; // Import the AuthGuard component

const router = createBrowserRouter([
	{
		path: "/",
		element: <Layout />,
		children: [
			{ path: "/", element: <AuthGuard element={Home} /> },
			{
				path: "clients/view",
				element: <AuthGuard element={ViewClients} />,
			},
			{ path: "clients/add", element: <AuthGuard element={AddClients} /> },
			{
				path: "employees/view",
				element: <AuthGuard element={ViewEmployees} />,
			},
			{
				path: "employees/add",
				element: <AuthGuard element={AddEmployees} />,
			},
			{ path: "cases/view", element: <AuthGuard element={ViewClients} /> },
			{ path: "cases/add", element: <AuthGuard element={AddClients} /> },
			{ path: "fields/view", element: <AuthGuard element={ViewFields} /> },
			{ path: "fields/add", element: <AuthGuard element={AddField} /> },
			{ path: "forms/view", element: <AuthGuard element={ViewClients} /> },
			{ path: "forms/add", element: <AuthGuard element={AddForm} /> },
			{
				path: "products/view",
				element: <AuthGuard element={ViewClients} />,
			},
			{
				path: "products/add",
				element: <AuthGuard element={AddProduct} />,
			},
			{
				path: "verifications/view",
				element: <AuthGuard element={ViewClients} />,
			},
			{
				path: "verifications/add",
				element: <AuthGuard element={AddClients} />,
			},
			{
				path: "activities/view",
				element: <AuthGuard element={ViewClients} />,
			},
			{
				path: "activities/add",
				element: <AuthGuard element={AddActivity} />,
			},
			{
				path: "accounting/incoming",
				element: <AuthGuard element={ViewClients} />,
			},
			{
				path: "accounting/outgoing",
				element: <AuthGuard element={AddClients} />,
			},
			{
				path: "accounting/invoices",
				element: <AuthGuard element={AddClients} />,
			},

			// You can add more child routes here if needed
		],
	},
	{
		path: "/login",
		element: <Login />,
	},
	{
		path: "*",
		element: <Layout />, // This handles all other routes with Layout
		children: [
			{ path: "*", element: <Login /> }, // This will redirect to login for any unmatched routes
		],
	},
]);

export default router;
