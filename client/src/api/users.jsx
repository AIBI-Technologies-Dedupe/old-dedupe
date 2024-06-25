import { apiSlice } from "../features/api/apiSlice";

export const authApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		signup: builder.mutation({
			query: (user) => ({
				url: "/auth/signup",
				method: "POST",
				body: user,
			}),
		}),
	}),
});

export const { useSignupMutation } = authApi;
