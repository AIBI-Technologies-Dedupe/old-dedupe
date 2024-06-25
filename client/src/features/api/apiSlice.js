import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

//base query that will attach the auth header to every request
const baseQuery = fetchBaseQuery({
	baseUrl: "http://localhost:3000",
	//   credentials: "include",                    //for httponly cookies
	prepareHeaders: (headers, { getState }) => {
		const token = getState().auth.token;
		if (token) {
			headers.set("x-access-token", `Bearer ${token}`);
		}
		return headers;
	},
});

export const apiSlice = createApi({
	baseQuery: baseQuery,
	endpoints: (builder) => ({}),
});
