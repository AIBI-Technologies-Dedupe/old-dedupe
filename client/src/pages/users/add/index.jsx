import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSignupMutation } from "../../../api/users"; // Adjust the path as needed
import FormRow from "../../../components/Form/Row";
import InputParent from "../../../components/Input/Parent";
import ActionButton from "../../../components/Button/ActionButton";

const AddUsers = () => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		phoneNo: "",
		role: "user",
	});

	const [signup, { isLoading, isError, isSuccess }] = useSignupMutation();
	const navigate = useNavigate();

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await signup(formData).unwrap();
			toast.success("User added successfully!");
			navigate("/");
		} catch (error) {
			toast.error("Error occurred while adding user.");
		}
	};

	return (
		<div className="flex flex-col gap-6">
			<h3 className="text-xl font-bold text-gray-800">Add User</h3>
			<form
				method="POST"
				className="flex flex-col gap-4"
				onSubmit={handleSubmit}>
				<FormRow>
					<InputParent>
						<label className="text-sm">Email</label>
						<input
							type="text"
							name="email"
							value={formData.email}
							onChange={handleChange}
							className="p-2 border border-gray-300 w-[100%]"
							placeholder="Email"
							required
						/>
					</InputParent>
					<InputParent>
						<label className="text-sm">Password</label>
						<input
							type="password"
							name="password"
							value={formData.password}
							onChange={handleChange}
							className="p-2 border border-gray-300 w-[100%]"
							placeholder="Password"
							required
						/>
					</InputParent>
				</FormRow>
				<FormRow>
					<InputParent>
						<label className="text-sm">Name</label>
						<input
							type="text"
							name="name"
							value={formData.name}
							onChange={handleChange}
							className="p-2 border border-gray-300 w-[100%]"
							placeholder="Name"
							required
						/>
					</InputParent>
					<InputParent>
						<label className="text-sm">Phone Number</label>
						<input
							type="text"
							name="phoneNo"
							value={formData.phoneNo}
							onChange={handleChange}
							className="p-2 border border-gray-300 w-[100%]"
							placeholder="Phone Number"
						/>
					</InputParent>
				</FormRow>
				<ActionButton type="submit" disabled={isLoading}>
					{isLoading ? "Submitting..." : "Add User"}
				</ActionButton>
				{isError && (
					<p className="text-red-500">Error occurred while adding user.</p>
				)}
				{isSuccess && (
					<p className="text-green-500">User added successfully!</p>
				)}
			</form>
		</div>
	);
};

export default AddUsers;
