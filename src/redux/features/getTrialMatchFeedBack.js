import { baseApi } from "../api/baseApi";

const getTrialMatchFeedBackApi = baseApi.injectEndpoints({
    endpoints:(builder)=>({
        trialMatchFeedBack:builder.query({
            query:()=>`/trail-match-feedback`,
            providesTags:["Feedback"],
        })
    })
})

export const {useTrialMatchFeedBackQuery} = getTrialMatchFeedBackApi;