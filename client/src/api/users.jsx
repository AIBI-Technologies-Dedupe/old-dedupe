import { apiSlice } from "../features/api/apiSlice";

export const usersApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        signup: builder.mutation({
            query: (user) => ({
                url: "/auth/signup",
                method: "POST",
                body: user,
            }),
        }),
        getUsers: builder.query({
            query: () => ({
                url: "/auth/getusers",
                method: "GET",
            }),
        }),
        updateUser: builder.mutation({
            query: ({ id, newEmail, newPassword, newName, newPhoneno }) => ({
                url: `/auth/update`,
                method: "PUT",
                body: { id, newEmail, newPassword, newName, newPhoneno },
            }),
        }),
        exportUsersToExcel: builder.mutation({
            query: () => ({
                url: "/admin/export-users",
                method: "GET",
                responseHandler: (response) => response.blob(),
            }),
        }),
    }),
});

export const {
    useSignupMutation,
    useGetUsersQuery,
    useCountUsersQuery,
    useExportUsersToExcelMutation,
    useUpdateUserMutation, // Hook for updating user
} = usersApi;
