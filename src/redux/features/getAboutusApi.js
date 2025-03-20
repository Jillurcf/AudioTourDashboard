import { baseApi } from "../api/baseApi";

const getAboutusApi = baseApi.injectEndpoints({
    endpoints:(builder)=>({
        getAboutus:builder.query({
            query:()=>`/about-us`,
            providesTags:["Settings"],
        })
    })
})

export const {useGetAboutusQuery} =getAboutusApi;