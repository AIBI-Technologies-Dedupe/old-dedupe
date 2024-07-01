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
		exportUsersToExcel: builder.mutation({
			query: () => ({
				url: "admin/export-users",
				method: "GET",
				responseHandler: (response) => response.blob(), // Important for handling binary data
			}),
		}),
	}),
});

export const {
	useSignupMutation,
	useGetUsersQuery,
	useCountUsersQuery,
	useExportUsersToExcelMutation,
} = usersApi;
