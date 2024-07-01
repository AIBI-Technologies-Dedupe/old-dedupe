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
		getUploadHistory: builder.query({
			query: () => ({
				url: "/history/upload",
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
	useLazyGetUploadHistoryQuery,
	useGetUploadHistoryQuery,
} = historyApi;
