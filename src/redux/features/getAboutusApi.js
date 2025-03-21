import { baseApi } from "../api/baseApi";

const getAboutusApi = baseApi.injectEndpoints({
    endpoints:(builder)=>({
        getAboutus:builder.query({
            query:()=>`/admin/pages/about`,
            providesTags:["Settings"],
        })
    })
})

export const {useGetAboutusQuery} =getAboutusApi;