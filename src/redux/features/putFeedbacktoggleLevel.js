import { baseApi } from "../api/baseApi";

const putFeedbackToggleLevelsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        feedbackToggleLevels: builder.mutation({
            query: ({ id, data }) => ({
                url: `/adjust-level/${id}`, 
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ["Feedback"],
        }),
    }),
});


export const {useFeedbackToggleLevelsMutation } = putFeedbackToggleLevelsApi;
