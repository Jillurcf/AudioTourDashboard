import { baseApi } from "../api/baseApi";

const getAllRejectionApi = baseApi.injectEndpoints({
    endpoints:(builder)=>({
        rejection:builder.query({
            query:()=>`/rejected-delivery`,
           invalidatesTags:["Product"],
            extraOptions: { refetchOnMountOrArgChange: true },
        })
        
    })
})


export const {useRejectionQuery} = getAllRejectionApi;
