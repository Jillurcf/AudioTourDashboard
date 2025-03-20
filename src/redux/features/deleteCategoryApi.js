import { baseApi } from "../api/baseApi";

const deleteCategorypi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        deleteCategory: builder.mutation({
            query: (id ) => ({
                url: `/admin/category/${id}`, 
                method: 'DELETE',
                // body: { _method: "DELETE" },
            }),
            invalidatesTags: ["Category"],
        }),
    }),
});

export const { useDeleteCategoryMutation } = deleteCategorypi; // Corrected export
