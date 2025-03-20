import { baseApi } from "../api/baseApi";

const getSingleCategory = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getSingleCategory: builder.query({
            query: (id) => `/admin/category/${id}`,
            providesTags: ["Categories"],
        })
    })
});

export const { useGetSingleCategoryQuery } = getSingleCategory;
