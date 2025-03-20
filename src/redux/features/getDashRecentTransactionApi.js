import { baseApi } from "../api/baseApi";

const getDashRecentTransactionApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getDashRecentTransactionApi: builder.query({
            query: () => `/admin/recent-transition`,
        })
    })
})

export const {useGetDashRecentTransactionApiQuery} = getDashRecentTransactionApi;