import { baseApi } from "../api/baseApi";

const deleteUserApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        deleteUser: builder.mutation({
            query: ({ id }) => ({
                url: `/admin/user/${id}`, 
                method: 'DELETE',
                // body: { _method: "DELETE" },
            }),
            invalidatesTags: ["Users"],
        }),
    }),
});

export const { useDeleteUserMutation } = deleteUserApi; // Corrected export
