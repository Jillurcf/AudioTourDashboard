import { baseApi } from "../api/baseApi";

const getUserDetails = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getUserDetails: builder.query({
            query: ({id}) => `/user-details?user_id=${id}`,
            providesTags: ["User"],
        })
    })
});

export const { useGetUserDetailsQuery } = getUserDetails;
