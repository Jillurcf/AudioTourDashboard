import { baseApi } from "../api/baseApi";

const postForgetPasswordApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        postForgetPassword: builder.mutation({
        query: (data) => {
            console.log("aimannnnnnnnnnnnnnnnnn",data);
            return {
              url: `/resent-otp`,
              method: 'POST',
              body: data,
          } 
        },
        invalidatesTags: ["Groups"],
      }),
    }),
   
  });
  
  export const { usePostForgetPasswordMutation } = postForgetPasswordApi;