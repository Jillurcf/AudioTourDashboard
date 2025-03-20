import { baseApi } from "../api/baseApi";

const postResendOtpApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
       resendOtp: builder.mutation({
        query: (data) => {
            console.log("7, postResendOtp", data);
            return{
                // url: '/auth/login',
                url: '/resendOtp',
                method: 'POST',
                body: data,
            }
        },
        invalidatesTags: ["Poftfolio"]
       })
    })
})

export const {useResendOtpMutation} = postResendOtpApi;