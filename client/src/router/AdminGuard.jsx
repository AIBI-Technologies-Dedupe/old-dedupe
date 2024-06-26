import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AdminGuard = ({ element: Component }) => {
	const token = useSelector((state) => state.auth.token);
	const role = useSelector((state) => state.auth.user.role);
	return token && role === "admin" ? <Component /> : <Navigate to="/login" />;
};

export default AdminGuard;
