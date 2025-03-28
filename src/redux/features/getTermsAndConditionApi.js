import { baseApi } from "../api/baseApi";

const getTermsAndConditionApi = baseApi.injectEndpoints({
    endpoints:(builder)=>({
        getTermsAndCondition:builder.query({
            query:()=>`/admin/pages/terms`,
            providesTags:["Settings"],
        })
    })
})

export const {useGetTermsAndConditionQuery} = getTermsAndConditionApi;