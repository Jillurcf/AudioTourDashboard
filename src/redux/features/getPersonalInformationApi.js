import { baseApi } from "../api/baseApi"

const getPersonalInformationApi = baseApi.injectEndpoints({
    endpoints:(builder) => ({
        getPersonalInformation:builder.query({
            query:() => `/profile`,
            invalidatesTags:["Users"],
        })
    })
})

export const {useGetPersonalInformationQuery} = getPersonalInformationApi