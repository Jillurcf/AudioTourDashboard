import { baseApi } from "../api/baseApi";

  
const postAddFaqApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addFaq: builder.mutation({
      query: (data) => ({
        url: `/admin/faq`,  // Ensure the correct route
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ["faqs"]
    }),
  }),
});


  export const {useAddFaqMutation} = postAddFaqApi;
