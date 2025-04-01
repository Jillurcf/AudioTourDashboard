// import { baseApi } from "../api/baseApi";

// const getAllUsersApi = baseApi.injectEndpoints({
//     endpoints:(builder)=>({
//         getAllUsers:builder.query({
//             query:(page)=>`/admin/user?per_page=${page}`,
//             providesTags:["Users"],
//         })
//     })
// })

// export const {useGetAllUsersQuery} = getAllUsersApi;

import { baseApi } from "../api/baseApi";

const getAllUsersApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllUsers: builder.query({
            query: ({ page, perPage }) => `/admin/user?page=${page}&per_page=${perPage}`,
            providesTags: ["Users"],
        }),
    }),
});

export const { useGetAllUsersQuery } = getAllUsersApi;
