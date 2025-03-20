import { baseApi } from "../api/baseApi";

const putUpdateNormalMatchQuestionApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        updateNormalMatchQuestion: builder.mutation({
            query: ({ id, data }) => {
                console.log("Updating NormalMatchQuestion with data:", data);

                return {
                    url: `/question/${id}`, 
                    method: 'POST', 
                    body: data,
                };
            },
            invalidatesTags: ["Question"], 
        }),
    }),
});

export const { useUpdateNormalMatchQuestionMutation } = putUpdateNormalMatchQuestionApi;
