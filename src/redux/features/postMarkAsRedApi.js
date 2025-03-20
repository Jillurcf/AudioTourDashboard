import { baseApi } from "../api/baseApi";

  
const postMarkAsReadApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    MarkAsRead: builder.mutation({
      query: (id) => ({
        url: `/notifications/read/${id}`,  // Ensure the correct route
        method: 'POST',
        // body: data,
      }),
      invalidatesTags: ["Notifications"]
    }),
  }),
});


  export const {useMarkAsReadMutation} = postMarkAsReadApi;
