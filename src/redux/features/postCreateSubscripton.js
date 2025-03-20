import { baseApi } from "../api/baseApi";

  
const postAddSubscription = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addSubscription: builder.mutation({
      query: (data) => ({
        url: `/admin/pricing-plan/update`,  // Ensure the correct route
        method: 'POST',
        body: data,
      }),
    }),
  }),
});


  export const {useAddSubscriptionMutation} = postAddSubscription;
