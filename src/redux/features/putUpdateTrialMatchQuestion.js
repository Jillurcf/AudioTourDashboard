import { baseApi } from "../api/baseApi";

const putUpdateTrialMatchQuestionApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        updateTrialMatchQuestion: builder.mutation({
            query: ({ id, data }) => {
                console.log("Updating TrialMatchQuestion with data:", data);

                return {
                    url: `/trail-match-question-update/${id}`, 
                    method: 'POST', 
                    body: data,
                };
            },
            invalidatesTags: ["Question"], 
        }),
    }),
});

export const {useUpdateTrialMatchQuestionMutation } = putUpdateTrialMatchQuestionApi;
