import { baseApi } from "../api/baseApi";

  
const postAddNormalMatchQuestionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addNormalMatchQuestion: builder.mutation({
      query: (data) => ({
        url: `/question`,  // Ensure the correct route
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ["Question"]
    }),
  }),
});


  export const {useAddNormalMatchQuestionMutation} = postAddNormalMatchQuestionApi;
