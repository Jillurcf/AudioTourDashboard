import { baseApi } from "../api/baseApi";

const deleteNormalMatchQuestionApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        deleteNormalMatchQuestion: builder.mutation({
            query: ({ id }) => ({
                url: `/question/${id}`, 
                method: 'DELETE',
                body: { _method: "DELETE" },
            }),
            invalidatesTags: ["Question"],
        }),
    }),
});

export const {useDeleteNormalMatchQuestionMutation} = deleteNormalMatchQuestionApi; // 
