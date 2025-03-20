import { baseApi } from "../api/baseApi";

const putUpateImageApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        updateImage: builder.mutation({
            query: ( data ) => {
                console.log("Updating PutUpdatePersonalInformation with data:", data);
                return {
                    url: `/profile-update-image`, 
                    method: 'POST', 
                    body: data,
                };
            },
            invalidatesTags: ["Users"], 
        }),
    }),
});

export const {useUpdateImageMutation} = putUpateImageApi



