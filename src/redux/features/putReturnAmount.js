import { baseApi } from "../api/baseApi";

const putReturnApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        putReturn: builder.mutation({
            query: ({ id, data }) => ({
                url: `/return-amount?order_id=${id}&_method=PUT`, 
                method: 'POST',
                body: { ...data, _method: "PUT" },
            }),
            providesTags: ["Product"],
        }),
    }),
});


export const {usePutReturnMutation} = putReturnApi


