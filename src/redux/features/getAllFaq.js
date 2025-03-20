import { baseApi } from "../api/baseApi";

const getAllFaqApi = baseApi.injectEndpoints({
    endpoints:(builder) => ({
        getAllFaq:builder.query({
            query:() => `/faqs`,
            
            providesTags: ["Faqs"],
        })
    })
})




export const {useGetAllFaqQuery} = getAllFaqApi;