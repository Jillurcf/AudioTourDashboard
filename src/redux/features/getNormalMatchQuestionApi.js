import { baseApi } from "../api/baseApi";


const getNormalMatchQuestionApi = baseApi.injectEndpoints({
    endpoints:(builder) => ({
        getNormalMatchQuestion:builder.query({
            query:() => `/questions`,
            providesTags: ["Question"],
        })
    })
})

export const {useGetNormalMatchQuestionQuery} = getNormalMatchQuestionApi;