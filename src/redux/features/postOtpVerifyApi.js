import { baseApi } from "../api/baseApi";

const postOtpVerifyApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
       postOtp: builder.mutation({
        query: (data) => {
            console.log("7, postOtpVerify", data);
            return{
                // url: '/auth/login',
                url: '/verify-email',
                method: 'POST',
                body: data,
            }
        },
        invalidatesTags: ["Poftfolio"]
       })
    })
})

export const {usePostOtpMutation} = postOtpVerifyApi;