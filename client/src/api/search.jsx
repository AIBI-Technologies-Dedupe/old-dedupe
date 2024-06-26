import { apiSlice } from "../features/api/apiSlice";

export const searchApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getSearchData: builder.query({
			query: (body) => ({
				url: "/search/",
				method: "POST",
				body: body,
			}),
		}),
	}),
});

export const { useGetSearchDataQuery, useLazyGetSearchDataQuery } = searchApi;
