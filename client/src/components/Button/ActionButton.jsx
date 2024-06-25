import React from "react";

const ActionButton = ({ children }) => {
	return (
		<button className="p-2 text-sm text-white rounded-md bg-blue-950 w-max">
			{children}
		</button>
	);
};

export default ActionButton;
