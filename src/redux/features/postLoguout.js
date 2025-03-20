import { baseApi } from "../api/baseApi";

const postLogoutApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
       postLogout: builder.mutation({
        query: () => {
            // console.log("7, postLogoutApi", data);
            return{
              
                url: '/logout',
                method: 'POST',
                // body: data,
            }
        },
        invalidatesTags: ["Users"]
       })
    })
})

export const {usePostLogoutMutation} = postLogoutApi;