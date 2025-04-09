import { baseApi } from "../api/baseApi";

const getAllFaqApi = baseApi.injectEndpoints({
    endpoints:(builder) => ({
        getAllFaq:builder.query({
            query:() => `/admin/faq`,
            
            providesTags: ["faqs"],
        })
    })
})




export const {useGetAllFaqQuery} = getAllFaqApi;