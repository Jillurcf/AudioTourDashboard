import { baseApi } from "../api/baseApi";

const postUpdateAudioApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    postUpdateAudio: builder.mutation({
      query: ({ data, id }) => ({
        url: `/admin/audio/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Audio"],
    }),
  }),
});

export const { usePostUpdateAudioMutation } = postUpdateAudioApi;
