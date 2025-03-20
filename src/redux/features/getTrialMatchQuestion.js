import { baseApi } from "../api/baseApi";


const getTrialMatchQuestionApi = baseApi.injectEndpoints({
    endpoints:(builder) => ({
        trialMatchQuestion:builder.query({
            query:() => `/trail-match-questions`,
            providesTags: ["Question"],
        })
    })
})

export const {useTrialMatchQuestionQuery} = getTrialMatchQuestionApi;