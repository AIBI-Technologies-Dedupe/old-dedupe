import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUpdateUserMutation } from "../../../api/users";
import FormRow from "../../../components/Form/Row";
import InputParent from "../../../components/Input/Parent";
import ActionButton from "../../../components/Button/ActionButton";

const UpdateUser = () => {
    const { id } = useParams(); // Get the user ID from the URL
    const [formData, setFormData] = useState({
        newEmail: "",
        newPassword: "",
        newName: "",
        newPhoneno: "",
    });

    const [updateUser, { isLoading, isError, isSuccess }] = useUpdateUserMutation();
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
            // Ensure at least one field is filled
            if (formData.newEmail || formData.newPassword || formData.newName || formData.newPhoneno) {
                const payload = { id };
                if (formData.newEmail) payload.newEmail = formData.newEmail;
                if (formData.newPassword) payload.newPassword = formData.newPassword;
                if (formData.newName) payload.newName = formData.newName;
                if (formData.newPhoneno) payload.newPhoneno = formData.newPhoneno;

                console.log('Payload being sent:', payload); // Add logging

                await updateUser(payload).unwrap();
                toast.success("User updated successfully!");
                navigate("/users/view"); // Redirect to users view page after successful update
            } else {
                toast.error("Please fill at least one field.");
            }
        } catch (error) {
            toast.error("Error occurred while updating user.");
        }
    };

    return (
        <div className="flex flex-col gap-6">
            <h3 className="text-xl font-bold text-gray-800">Update User</h3>
            <form method="POST" className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <FormRow>
                    <InputParent>
                        <label className="text-sm">New Email</label>
                        <input
                            type="text"
                            name="newEmail"
                            value={formData.newEmail}
                            onChange={handleChange}
                            className="p-2 border border-gray-300 w-[100%]"
                            placeholder="New Email"
                        />
                    </InputParent>
                    <InputParent>
                        <label className="text-sm">New Password</label>
                        <input
                            type="password"
                            name="newPassword"
                            value={formData.newPassword}
                            onChange={handleChange}
                            className="p-2 border border-gray-300 w-[100%]"
                            placeholder="New Password"
                        />
                    </InputParent>
                </FormRow>
                <FormRow>
                    <InputParent>
                        <label className="text-sm">New Name</label>
                        <input
                            type="text"
                            name="newName"
                            value={formData.newName}
                            onChange={handleChange}
                            className="p-2 border border-gray-300 w-[100%]"
                            placeholder="New Name"
                        />
                    </InputParent>
                    <InputParent>
                        <label className="text-sm">New Phone Number</label>
                        <input
                            type="text"
                            name="newPhoneno"
                            value={formData.newPhoneno}
                            onChange={handleChange}
                            className="p-2 border border-gray-300 w-[100%]"
                            placeholder="New Phone Number"
                        />
                    </InputParent>
                </FormRow>
                <ActionButton type="submit" disabled={isLoading}>
                    {isLoading ? "Updating..." : "Update User"}
                </ActionButton>
                {isError && <p className="text-red-500">Error occurred while updating user.</p>}
                {isSuccess && <p className="text-green-500">User updated successfully!</p>}
            </form>
        </div>
    );
};

export default UpdateUser;
