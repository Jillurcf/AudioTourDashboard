import { baseApi } from "../api/baseApi";

const getProfileApi = baseApi.injectEndpoints({
    endpoints:(builder)=>({
        getProfile:builder.query({
            query:()=>`/profile`,
            providesTags:["Users"],
        })
    })
})

export const {useGetProfileQuery} = getProfileApi;