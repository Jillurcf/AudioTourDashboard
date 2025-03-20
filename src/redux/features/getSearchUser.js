import { baseApi } from "../api/baseApi";

const getSearchUserApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        searchUsers: builder.query({
            query: (email) => `/user-search?query=${email}`, // Corrected URL format
        }),
        providesTags: ["Users"], // Optional: Tag for cache invalidation if needed
    }),
});

export const { useSearchUsersQuery } = getSearchUserApi; // Ensure correct export name
