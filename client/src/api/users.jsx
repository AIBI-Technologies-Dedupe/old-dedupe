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
	}),
});

export const { useSignupMutation, useGetUsersQuery, useCountUsersQuery } =
	usersApi;
