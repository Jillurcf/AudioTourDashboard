import { baseApi } from "../api/baseApi";

  
const postAddTrialMatchQuestionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addTrialMatchQuestion: builder.mutation({
      query: (data) => ({
        url: `/trail-match-question`,  // Ensure the correct route
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ["Question"]
    }),
  }),
});


  export const {useAddTrialMatchQuestionMutation} = postAddTrialMatchQuestionApi;
