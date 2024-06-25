import React from "react";
import FormRow from "../../../components/Form/Row";
import InputParent from "../../../components/Input/Parent";
import ActionButton from "../../../components/Button/ActionButton";
const AddUsers = () => {
	const types = ["USER", "ADMIN"];
	return (
		<div className="flex flex-col gap-6">
			<h3 className="text-xl font-bold text-gray-800">Add User</h3>
			<form method="POST" className="flex flex-col gap-4">
				<FormRow>
					<InputParent>
						<label className="text-sm">Email</label>
						<input
							type="text"
							className="p-2 border border-gray-300 w-[100%]"
							placeholder="Email"
							required
						/>
					</InputParent>
					<InputParent>
						<label className="text-sm">Password</label>
						<input
							type="password"
							className="p-2 border border-gray-300 w-[100%]"
							placeholder="Phone Number"
							required
						/>
					</InputParent>
				</FormRow>
				<FormRow>
					<InputParent>
						<label className="text-sm">Name</label>
						<input
							type="text"
							className="p-2 border border-gray-300 w-[100%]"
							placeholder="Employee Name"
							required
						/>
					</InputParent>
					<InputParent>
						<label className="text-sm">Phone Number</label>
						<input
							type="text"
							className="p-2 border border-gray-300 w-[100%]"
							placeholder="Phone Number"></input>
					</InputParent>
				</FormRow>

				<ActionButton>Add Form</ActionButton>
			</form>
		</div>
	);
};

export default AddUsers;
