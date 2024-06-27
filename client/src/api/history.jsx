import { apiSlice } from "../features/api/apiSlice";

export const historyApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getUserHistory: builder.query({
			query: () => ({
				url: "/history/user",
				method: "GET",
			}),
		}),
		getSearchHistory: builder.query({
			query: () => ({
				url: "/history/search",
				method: "GET",
			}),
		}),
	}),
});

export const {
	useGetUserHistoryQuery,
	useLazyGetSearchHistoryQuery,
	useLazyGetUserHistoryQuery,
	useGetSearchHistoryQuery,
} = historyApi;
