import { baseApi } from "../api/baseApi";

const putUpdateClubApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        putUpdateClub: builder.mutation({
            query: ({ id, data }) => {
                console.log("Updating club with data:", data);

                return {
                    url: `/club/${id}`, // Endpoint with dynamic ID
                    method: 'POST', // Use POST to allow `_method: "PUT"` in FormData
                    body: data,
                };
            },
            invalidatesTags: ["Clubs"], // Ensure this tag matches related queries
        }),
    }),
});

export const { usePutUpdateClubMutation } = putUpdateClubApi;
