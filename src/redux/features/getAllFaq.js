import { baseApi } from "../api/baseApi";

const getAllFaqApi = baseApi.injectEndpoints({
    endpoints:(builder) => ({
        getAllFaq:builder.query({
            query:() => `/admin/faq`,
            
            providesTags: ["Faqs"],
        })
    })
})




export const {useGetAllFaqQuery} = getAllFaqApi;