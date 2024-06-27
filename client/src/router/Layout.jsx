import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
			<div className="flex flex-1 bg-gray-50 md:flex-row">
				<div className="flex flex-col">
					<Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
				</div>

				<div className="w-full p-6 overflow-x-auto">
					<Outlet />
				</div>
			</div>
			<Footer />
			<ToastContainer
				position="top-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
		</div>
	);
};

export default Layout;
