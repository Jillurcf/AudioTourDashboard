import { baseApi } from "../api/baseApi";

const getAllSubscriptionApi = baseApi.injectEndpoints({
    endpoints:(builder)=>({
        getAllSubscription:builder.query({
            query:()=>`/admin/pricing-plan`,
            providesTags:["Subscripton"],
            extraOptions: { refetchOnMountOrArgChange: true },
        })
        
    })
})

export const {useGetAllSubscriptionQuery} = getAllSubscriptionApi;