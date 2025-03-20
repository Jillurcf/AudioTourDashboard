import { baseApi } from "../api/baseApi";

const getDashHomeApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getDashHomeApi: builder.query({
            query: () => `/admin/dashboard`,
        })
    })
})

export const {useGetDashHomeApiQuery} = getDashHomeApi;