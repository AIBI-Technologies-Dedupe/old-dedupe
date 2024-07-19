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
		getRecordById: builder.query({
			query: (id) => ({
				url: `/search/${id}`,
				method: "GET",
			}),
		}),
	}),
});

export const {
	useGetSearchDataQuery,
	useLazyGetSearchDataQuery,
	useGetRecordByIdQuery,
} = searchApi;
