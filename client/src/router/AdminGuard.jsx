import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AdminGuard = ({ element: Component }) => {
	const token = useSelector((state) => state.auth.token);
	const role = useSelector((state) => state.auth.user.role);

	if (!token) {
		return <Navigate to="/login" />;
	}

	if (role !== "admin") {
		return <Navigate to="/cases/add" />;
	}

	return <Component />;
};

export default AdminGuard;
