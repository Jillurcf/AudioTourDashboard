import { baseApi } from "../api/baseApi";

const putApprovedApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        putApproved: builder.mutation({
            query: ({ id, data }) => ({
                url: `/approved/${id}`, 
                method: 'POST',
                body: { ...data, _method: "PUT" },
            }),
            invalidatesTags: ["Product"],
        }),
    }),
});



export const { usePutApprovedMutation } = putApprovedApi;
