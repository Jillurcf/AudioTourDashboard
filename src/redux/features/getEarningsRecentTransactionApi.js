import { baseApi } from "../api/baseApi";

const getEarningRecentTransaction = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getEarningRecentTransaction: builder.query({
            query: () => `/admin/all-earnings`,
        })
    })
});

export const {useGetEarningRecentTransactionQuery} = getEarningRecentTransaction;
