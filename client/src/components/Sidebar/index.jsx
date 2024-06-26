import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaCircle } from "react-icons/fa6";
import { GoChevronLeft } from "react-icons/go";
import Profile from "../../assets/profile/profile1.jpg";
import { getNavLinks } from "./utils/Nav";

import { selectCurrentUser } from "../../features/auth/authSlice";
import { useSendLogoutMutation } from "../../features/auth/authApiSlice";
import { useSelector } from "react-redux";
const Sidebar = ({ isOpen, toggleSidebar }) => {
	const role = useSelector((state) => state.auth.user.role || null);
	const navLinks = getNavLinks(role);
	const [sendLogout, { isLoading, isSuccess, isError, error }] =
		useSendLogoutMutation();
	const [openSubMenu, setOpenSubMenu] = useState(null);
	const location = useLocation();
	const navigate = useNavigate();
	const toggleSubMenu = (name) => {
		setOpenSubMenu(openSubMenu === name ? null : name);
	};
	const user = useSelector(selectCurrentUser);

	const isActive = (to) => {
		return location.pathname === to;
	};

	const isGroupActive = (link) => {
		if (link.to && isActive(link.to)) return true;
		if (link.subpages) {
			return link.subpages.some((subpage) => isActive(subpage.to));
		}
		return false;
	};

	const handleLinkClick = () => {
		toggleSidebar();
		window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to the top of the page with smooth behavior
	};

	useEffect(() => {
		if (isSuccess) {
			navigate("/login");
		}
	}, [isSuccess, navigate]);

	return (
		<div
			className={`h-[100%] md:h-dvh bg-blue-900 md:w-[300px] flex flex-col gap-4 fixed md:static top-0 left-0 transition-transform transform ${
				isOpen ? "translate-x-0" : "-translate-x-full"
			} md:translate-x-0 z-50`}>
			<div className="p-4 font-semibold bg-gray-900">
				<div className="flex items-center gap-4">
					<img src={Profile} className="w-[60px] h-[60px] rounded-full" />
					<div className="flex flex-col">
						<div className="text-lg text-white">{user.name}</div>
						<div className="flex items-center gap-1 text-green-500">
							<FaCircle />
							Online
						</div>
					</div>
				</div>
			</div>
			<div className="flex flex-col gap-3 px-4 pb-4 text-white ">
				{navLinks.map((link) => (
					<div key={link.name}>
						{link.to ? (
							<Link
								to={link.to}
								className={`flex items-center gap-1 p-2 ${
									isActive(link.to) ? "text-red-500" : ""
								} hover:font-bold transition-all ease-in-out`}
								onClick={handleLinkClick}>
								{link.Icon}
								{link.name}
							</Link>
						) : (
							<div className="w-[100%]">
								<button
									onClick={() => toggleSubMenu(link.name)}
									className="flex items-center justify-between w-[100%] p-2 hover:font-bold transition-all ease-in-out">
									<div
										className={`${
											isGroupActive(link) ? "text-red-500" : ""
										} flex items-center gap-1 `}>
										{link.Icon}
										{link.name}
									</div>
									<GoChevronLeft
										className={`font-thin transition-transform duration-500 ${
											openSubMenu === link.name ? "-rotate-90" : ""
										}`}
									/>
								</button>
								<div
									className={`transition-all duration-500 overflow-hidden ${
										openSubMenu === link.name ? "max-h-screen" : "max-h-0"
									}`}>
									<div className="flex flex-col gap-4 pl-5 mt-4">
										{link.subpages &&
											link.subpages.map((subpage) => (
												<Link
													key={subpage.name}
													to={subpage.to}
													className={`block hover:font-bold transition-all ease-in-out ${
														isActive(subpage.to) ? "text-red-500" : ""
													}`}
													onClick={handleLinkClick}>
													{subpage.name}
												</Link>
											))}
									</div>
								</div>
							</div>
						)}
					</div>
				))}
				<p
					onClick={() => {
						sendLogout();
					}}
					className="flex items-center justify-center gap-1 p-2 text-white bg-red-500 rounded-md hover:bg-blue-400 hover:cursor-pointer">
					Logout
				</p>
			</div>
		</div>
	);
};

export default Sidebar;
