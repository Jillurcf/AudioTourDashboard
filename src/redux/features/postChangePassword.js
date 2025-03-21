import { baseApi } from "../api/baseApi";

const postChangePasswordApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
      postChangePassword: builder.mutation({
        query: (data) => ({
          url: `/reset-password`,
          method: 'POST',
          body: data,
         
        }),
      }),
    }),
  });
  
  export const { usePostChangePasswordMutation } = postChangePasswordApi;
  