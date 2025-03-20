import { baseApi } from "../api/baseApi";

const postCreateclubApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
      postCreateclub: builder.mutation({
        query: (data) => ({
          url: `/club`,
          method: 'POST',
          body: data,
         
        }),
      }),
    }),
  });
  
  export const { usePostCreateclubMutation } = postCreateclubApi;
  