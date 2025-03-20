import { baseApi } from "../api/baseApi";

const putCancelApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        putCancel: builder.mutation({
            query: ({ id, data }) => ({
                url: `/canceled/${id}`, 
                method: 'POST',
                body: { ...data, _method: "PUT" },
            }),
            invalidatesTags: ["Product"],
        }),
    }),
});


export const {usePutCancelMutation} = putCancelApi;
