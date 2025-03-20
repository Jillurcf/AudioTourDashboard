import { baseApi } from "../api/baseApi";

const postAddCategoriesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addCategories: builder.mutation({
      query: (data) => ({
        url: `/admin/category`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Categories"],
    }),
  }),
});

export const { useAddCategoriesMutation } = postAddCategoriesApi;
