import React from "react";
import { FaBars } from "react-icons/fa";

const Header = ({ toggleSidebar }) => {
	return (
		<div className="flex items-center justify-between px-8 py-2 border border-b-gray-300 ">
			<div className="flex items-center gap-2">
				<h1 className="font-bold">
					<em>Dedupe</em>
				</h1>
			</div>
			<FaBars
				className="text-xl cursor-pointer md:hidden"
				onClick={toggleSidebar}
			/>
		</div>
	);
};

export default Header;
