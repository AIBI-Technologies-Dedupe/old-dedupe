import { apiSlice } from "../features/api/apiSlice";

export const dataApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getCount: builder.query({
			query: () => ({
				url: "/data/count",
				method: "GET",
			}),
		}),
		uploadFile: builder.mutation({
			query: (formData) => ({
				url: "/data/import",
				method: "POST",
				body: formData,
			}),
		}),
	}),
});

export const { useGetCountQuery, useUploadFileMutation } = dataApi;
