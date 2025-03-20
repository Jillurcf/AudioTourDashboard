import { baseApi } from "../api/baseApi";

const putChangeUserStatusApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        putChangeUserStatus: builder.mutation({
            query: ({ id, data }) => ({
                url: `/change-status/${id}`, 
                method: 'POST',
                body: { ...data, _method: "PUT" },
            }),
            invalidatesTags: ["Users"],
        }),
    }),
});



export const { usePutChangeUserStatusMutation } = putChangeUserStatusApi;
