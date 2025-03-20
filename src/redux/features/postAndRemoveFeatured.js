import { baseApi } from "../api/baseApi";

const postAddAndRemoveFeatured = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    featuredAddAndRemove: builder.mutation({
      query: (id) => ({
        url: `/admin/featured`,
        method: "POST",
        body: id,
      }),
      invalidatesTags: ["Categories"],
    }),
  }),
});

export const { useFeaturedAddAndRemoveMutation} = postAddAndRemoveFeatured;
