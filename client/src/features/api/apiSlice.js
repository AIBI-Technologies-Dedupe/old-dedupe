import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

//base query that will attach the auth header to every request
const baseQuery = fetchBaseQuery({
	baseUrl: "https://dedupe-be-ghic7y4swa-el.a.run.app",
	//   credentials: "include",                    //for httponly cookies
	prepareHeaders: (headers, { getState }) => {
		const token = getState().auth.token;
		if (token) {
			headers.set("authorization", `Bearer ${token}`);
		}
		return headers;
	},
});

export const apiSlice = createApi({
	baseQuery: baseQuery,
	tagTypes: ["users"],
	endpoints: (builder) => ({}),
});
