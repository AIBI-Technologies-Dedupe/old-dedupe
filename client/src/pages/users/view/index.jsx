import React from "react";
import { useGetUsersQuery } from "../../../api/users";
import { useNavigate } from "react-router-dom";

const ViewUsers = () => {
    const { data, error, isLoading } = useGetUsersQuery();
    const navigate = useNavigate();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading users.</div>;

    const users = data?.users || [];

    const handleEdit = (id) => {
        navigate(`/edit-user/${id}`);
    };

    return (
        <div>
            <h3 className="text-xl font-bold text-gray-800">Users List</h3>
            <table className="w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase border-b border-gray-500 bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Email
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Phone Number
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Role
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Created On
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id} className="bg-white">
                            <th
                                scope="row"
                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                {user.name}
                            </th>
                            <td className="px-6 py-4">{user.email}</td>
                            <td className="px-6 py-4">{user.phoneNo}</td>
                            <td className="px-6 py-4">{user.role.toUpperCase()}</td>
                            <td className="px-6 py-4">
                                {new Date(user.createdat).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4">
                                <button
                                    onClick={() => handleEdit(user.id)}
                                    className="text-blue-500 hover:text-blue-700">
                                    Edit
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ViewUsers;