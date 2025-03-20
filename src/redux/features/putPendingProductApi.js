import { baseApi } from "../api/baseApi";

const putPendingApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        putPending: builder.mutation({
            query: ({ id, data }) => ({
                url: `/pending/${id}`, 
                method: 'POST',
                body: { ...data, _method: "PUT" },
            }),
            invalidatesTags: ["Product"],
        }),
    }),
});

export const {usePutPendingMutation} = putPendingApi;
