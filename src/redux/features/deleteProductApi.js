import { baseApi } from "../api/baseApi";

const deletePrductApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        deletePrduct: builder.mutation({
            query: ({ id }) => ({
                url: `/delete-Prduct/${id}`, 
                method: 'DELETE',
                // body: { _method: "DELETE" },
            }),
            invalidatesTags: ["Prducts"],
        }),
    }),
});

export const { useDeletePrductMutation} = deletePrductApi; // Corrected export
