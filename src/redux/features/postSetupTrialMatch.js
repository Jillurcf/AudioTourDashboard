import { baseApi } from "../api/baseApi";

const postSetupTrialMatchApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        postSetupTrialMatch: builder.mutation({
            query: ({ id, data }) => ({ // Accept `id` and `data` as parameters
                url: `/setup-trail-match/${id}`, // Use `id` dynamically in the URL
                method: 'POST',
                body: data,
                headers: {
                    'Content-Type': 'application/json',
                },
               
            }),
            invalidatesTags: ["Request"],
            transformResponse: (response) => {
                if (typeof response === "string" && response.startsWith("<!doctype html>")) {
                    throw new Error("Received an unexpected HTML response.");
                }
                return response;
            },
        }),
    }),
});

export const { usePostSetupTrialMatchMutation } = postSetupTrialMatchApi;
