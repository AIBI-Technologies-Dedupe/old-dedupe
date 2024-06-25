import React from "react";
import FormRow from "../../../components/Form/Row";
import InputParent from "../../../components/Input/Parent";
import ActionButton from "../../../components/Button/ActionButton";
const AddUsers = () => {
	const types = ["CRE", "DVE", "OF", "ADMIN", "SUPERVISOR"];
	return (
		<div className="flex flex-col gap-6">
			<h3 className="text-xl font-bold text-gray-800">Add Employees</h3>
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
						<label className="text-sm">Employee Name</label>
						<input
							type="text"
							className="p-2 border border-gray-300 w-[100%]"
							placeholder="Employee Name"
							required
						/>
					</InputParent>
					<InputParent>
						<label className="text-sm">Employee Type</label>
						<select
							name=""
							id=""
							className="p-2 border border-gray-300 w-[100%]">
							<option value="" disabled selected hidden>
								--Select Employee Type--
							</option>
							{types.map((e) => {
								return <option value={e}>{e}</option>;
							})}
						</select>
					</InputParent>
					<InputParent>
						<label className="text-sm">Supervisor</label>
						<select className="p-2 border border-gray-300 w-[100%] " required>
							<option value="" disabled selected hidden>
								--Select Supervisor--
							</option>
							<option value="">Text</option>
							<option value="">Dropdown</option>
							<option value="">Email</option>
							<option value="">Radio</option>
							<option value="">Phone Number</option>
							<option value="">Number</option>
						</select>
					</InputParent>
				</FormRow>

				<ActionButton>Add Form</ActionButton>
			</form>
		</div>
	);
};

export default AddUsers;
