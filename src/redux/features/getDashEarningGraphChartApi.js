import { baseApi } from "../api/baseApi";

const getDashEarningGraphChartApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getDashEarningGraphChartApi: builder.query({
            query: ({year}) => `/admin//earning-chart?year=${year}`,
        })
    })
})

export const {useGetDashEarningGraphChartApiQuery} = getDashEarningGraphChartApi;