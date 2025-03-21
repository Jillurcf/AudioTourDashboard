import { baseApi } from "../api/baseApi";

const getSingleAudio = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getSingleAudio: builder.query({
            query: (id) => `/admin/audio/${id}`,
            providesTags: ["Audio"],
        })
    })
});

export const { useGetSingleAudioQuery } = getSingleAudio;
