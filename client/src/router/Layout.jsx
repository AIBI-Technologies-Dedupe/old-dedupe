import React, { useState } from "react";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const Layout = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};

	return (
		<div className="flex flex-col justify-between min-h-screen">
			<Header toggleSidebar={toggleSidebar} />
			<div className="flex flex-col md:flex-row bg-gray-50 flex-1">
				<Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
				<div className="w-full p-6 ">
					<Outlet />
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default Layout;
