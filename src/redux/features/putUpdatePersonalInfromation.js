import { baseApi } from "../api/baseApi";

const putUpdatePutUpdatePersonalInformationApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        updatePersonalInformation: builder.mutation({
            query: ( data ) => {
                console.log("Updating PutUpdatePersonalInformation with data:", data);

                return {
                    url: `/update-profile`, 
                    method: 'POST', 
                    body: data,
                };
            },
            invalidatesTags: ["Users"], 
        }),
    }),
});

export const { useUpdatePersonalInformationMutation } = putUpdatePutUpdatePersonalInformationApi;
