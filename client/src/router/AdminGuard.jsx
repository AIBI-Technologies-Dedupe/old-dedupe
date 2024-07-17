import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AdminGuard = ({ element: Component }) => {
	const token = useSelector((state) => state.auth.token);
	const role = useSelector((state) => state.auth.user?.role); // Use optional chaining

	if (!token || role === null) {
		// Navigate to login if token is not present or role is null
		return <Navigate to="/login" />;
	}

	if (role !== "admin") {
		return <Navigate to="/cases/add" />;
	}

	return <Component />;
};

export default AdminGuard;
