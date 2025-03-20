import { baseApi } from "../api/baseApi";

const postUpdateCategoriesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    updateCategories: builder.mutation({
      query: ({ data, id }) => ({
        url: `/admin/category/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Categories"],
    }),
  }),
});

export const { useUpdateCategoriesMutation } = postUpdateCategoriesApi;
