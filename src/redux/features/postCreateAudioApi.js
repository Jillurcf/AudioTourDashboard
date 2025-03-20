import { baseApi } from "../api/baseApi";

const postCreateAudioApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
      postCreateAudio: builder.mutation({
        query: (data) => ({
          url: `/admin/audio`,
          method: 'POST',
          body: data,
         
        }),
      }),
    }),
  });
  
  export const { usePostCreateAudioMutation } = postCreateAudioApi;
  