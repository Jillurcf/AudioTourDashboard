import { baseApi } from "../api/baseApi";

const getAllTransactionApi = baseApi.injectEndpoints({
    endpoints:(builder)=>({
        allTransaction:builder.query({
            query:()=>`/transitions`,
            providesTags:["Transactions"],
            extraOptions: { refetchOnMountOrArgChange: true },
        })
        
    })
})

export const {useAllTransactionQuery} = getAllTransactionApi;